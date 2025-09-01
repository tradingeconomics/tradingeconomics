import type { TimeSeriesData } from "@/utils/types";

abstract class TradingEconomicsBaseAPIService {
  BASE_URL = `https://api.tradingeconomics.com`;
  protected apiKey: string;

  constructor() {
    this.apiKey = process.env.TRADING_ECONOMICS_API_KEY || "";
  }

  protected async fetch(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${endpoint}`);
    
    if (params) {
      const searchParams = new URLSearchParams(params);
      url.search = searchParams.toString();
    }
    
    const response = await fetch(
      url.toString(),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${this.apiKey}`,
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

class HistoricalDataAPIService extends TradingEconomicsBaseAPIService {
  async getDataByCountry(country: string, indicator: string, startAt=""): Promise<TimeSeriesData[]> {
    const url = `${this.BASE_URL}/historical/country/${country}/indicator/${indicator}/${startAt}`
    const data = await this.fetch(url);
    return data.slice(0, -1)
  }
}

export { HistoricalDataAPIService };