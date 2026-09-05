import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { env } from "config/env";

type Country = "mexico" | "thailand";
type Period = "monthly" | "quarterly" | "yearly";

interface RawDataPoint {
    DateTime: string;
    Value: number;
}

interface ProcessedDataPoint {
    date: string;
    value: number;
}

interface CacheEntry {
    data: ProcessedDataPoint[];
    timestamp: number;
    aggregations?: {
        monthly: ProcessedDataPoint[];
        quarterly: ProcessedDataPoint[];
        yearly: ProcessedDataPoint[];
    };
}

interface PendingRequest {
    promise: Promise<ProcessedDataPoint[]>;
    timestamp: number;
}

const { API_KEY, TRADING_ECONOMICS_BASE_URL, MEXICO_ENDPOINT, THAILAND_ENDPOINT } = env;

const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
const DEDUP_TTL = 30 * 1000; // 30 seconds for request deduplication

const cache = new Map<string, CacheEntry>();
const pendingRequests = new Map<string, PendingRequest>();

export class ChartController {
    private sanitizeData(rawData: RawDataPoint[]): ProcessedDataPoint[] {
        if (!Array.isArray(rawData) || rawData.length === 0) {
            return [];
        }

        let cleaned = rawData
            .filter(
                (item) =>
                    item &&
                    item.DateTime &&
                    item.Value !== null &&
                    item.Value !== undefined &&
                    !isNaN(Number(item.Value)) &&
                    isFinite(Number(item.Value))
            )
            .map((item) => ({
                date: item.DateTime.replace("T00:00:00", ""),
                value: Number(item.Value),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        while (cleaned.length > 0 && cleaned[cleaned.length - 1].value === 0) {
            cleaned.pop();
        }

        return cleaned;
    }

    private aggregateData(data: ProcessedDataPoint[], period: Period): ProcessedDataPoint[] {
        if (!data || data.length === 0) return [];

        const aggregated: {
            [key: string]: {
                values: number[];
                dates: Date[];
            };
        } = {};

        data.forEach((item) => {
            let key: string;
            const date = new Date(item.date);

            switch (period) {
                case "monthly":
                    key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
                    break;
                case "quarterly":
                    const quarter = Math.floor(date.getMonth() / 3) + 1;
                    key = `${date.getFullYear()}-Q${quarter}`;
                    break;
                case "yearly":
                    key = `${date.getFullYear()}`;
                    break;
            }

            if (!aggregated[key]) {
                aggregated[key] = {
                    values: [],
                    dates: [],
                };
            }
            aggregated[key].values.push(item.value);
            aggregated[key].dates.push(date);
        });

        return Object.keys(aggregated)
            .sort()
            .map((key) => {
                const group = aggregated[key];
                const avgValue = group.values.reduce((sum, val) => sum + val, 0) / group.values.length;
                const latestDate = new Date(Math.max(...group.dates.map((d) => d.getTime())));

                return {
                    date: latestDate.toISOString().split("T")[0],
                    value: Math.round(avgValue * 100) / 100,
                };
            });
    }

    private async fetchCountryData(country: Country): Promise<ProcessedDataPoint[]> {
        const endpoint = country === "mexico" ? MEXICO_ENDPOINT : THAILAND_ENDPOINT;
        const cacheKey = `${country}_data`;
        const url = `${TRADING_ECONOMICS_BASE_URL}${endpoint}?c=${API_KEY}`;

        const cached = cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            return cached.data;
        }

        const pending = pendingRequests.get(cacheKey);
        if (pending && Date.now() - pending.timestamp < DEDUP_TTL) {
            return pending.promise;
        }

        const requestPromise = this.makeApiRequest(url, country);
        pendingRequests.set(cacheKey, {
            promise: requestPromise,
            timestamp: Date.now(),
        });

        try {
            const data = await requestPromise;

            const aggregations = {
                monthly: this.aggregateData(data, "monthly"),
                quarterly: this.aggregateData(data, "quarterly"),
                yearly: this.aggregateData(data, "yearly"),
            };

            cache.set(cacheKey, {
                data,
                timestamp: Date.now(),
                aggregations,
            });

            pendingRequests.delete(cacheKey);

            return data;
        } catch (error) {
            pendingRequests.delete(cacheKey);
            throw error;
        }
    }

    private async makeApiRequest(url: string, country: string): Promise<ProcessedDataPoint[]> {
        const maxRetries = 3;
        const baseDelay = 1000; // 1 second

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response: AxiosResponse<RawDataPoint[]> = await axios.get(url, {
                    timeout: 15000, // 15 second timeout
                    headers: {
                        Accept: "application/json",
                        "User-Agent": "Chart-App/1.0",
                    },
                });

                return this.sanitizeData(response.data);
            } catch (error: any) {
                const isRateLimit =
                    error.response?.status === 409 ||
                    error.response?.status === 429 ||
                    error.response?.data?.includes?.("Rate Exceeded");

                if (isRateLimit && attempt < maxRetries) {
                    const delay = baseDelay * Math.pow(2, attempt - 1); // exponential backoff
                    console.log(
                        `Rate limit hit for ${country}, retrying in ${delay}ms (attempt ${attempt}/${maxRetries})`
                    );
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    continue;
                }

                // ff it's not a rate limit error or we've exhausted retries, throw the error
                throw error;
            }
        }

        throw new Error(`Failed to fetch data for ${country} after ${maxRetries} attempts`);
    }

    public renderChartPage = async (req: Request, res: Response): Promise<void> => {
        try {
            const mexicoPromise = this.fetchCountryData("mexico");

            // waiting some ms before making the second request
            // await new Promise((resolve) => setTimeout(resolve, 200));
            const thailandPromise = this.fetchCountryData("thailand");

            const [mexicoData, thailandData] = await Promise.all([mexicoPromise, thailandPromise]);

            res.render("charts", {
                title: "Mexico vs Thailand Car Registration Comparison",
                mexicoData,
                thailandData,
            });
        } catch (error: any) {
            let errorMessage = "Failed to fetch chart data";
            let statusCode = 500;

            if (error.response?.status === 409 || error.response?.status === 429) {
                errorMessage = "API rate limit exceeded. Please try again in a moment.";
                statusCode = 429;
            } else if (error.code === "ECONNABORTED") {
                errorMessage = "Request timeout. Please try again.";
                statusCode = 408;
            }

            if (env.NODE_ENV === "development") {
                console.error("Chart data fetch error:", errorMessage, error.message);
            }

            res.status(statusCode).render("charts", {
                title: "Mexico vs Thailand Car Registration Comparison",
                mexicoData: [],
                thailandData: [],
                error: errorMessage,
            });
        }
    };

    public getAggregatedData(country: Country, period: Period): ProcessedDataPoint[] | null {
        const cacheKey = `${country}_data`;
        const cached = cache.get(cacheKey);

        if (cached && cached.aggregations && Date.now() - cached.timestamp < CACHE_TTL) {
            return cached.aggregations[period];
        }

        return null;
    }

    public clearCache(): void {
        cache.clear();
        pendingRequests.clear();
    }
}

export default ChartController;
