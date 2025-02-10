// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import { getIndicatorsData, getNewsData } from "@/lib/api";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import IndicatorsSection from "../components/IndicatorsSection";
import NewsSection from "../components/NewsSection";


export default function Page() {
    const [selectedCountries, setSelectedCountries] = useState(["mexico", "sweden", "new zealand", "thailand"]);
    const [selectedIndicators, setSelectedIndicators] = useState(["population", "gdp", "unemployment", "inflation"]);
    const [data, setData] = useState<any>(null);
    const [news, setNews] = useState<any>(null);
    const [dateFrom, setDateFrom] = useState(() => {
        const today = new Date("2014-01-01");
        return format(today, "yyyy-MM-dd");
    });
    const [dateTo, setDateTo] = useState(() => {
        const today = new Date("2015-01-01");
        return format(today, "yyyy-MM-dd");
    });
    const [newsDateFrom, setNewsDateFrom] = useState(() => {
        const today = new Date("2014-01-01");
        return format(today, "yyyy-MM-dd");
    });
    const [newsDateTo, setNewsDateTo] = useState(() => {
        const today = new Date("2015-01-01");
        return format(today, "yyyy-MM-dd");
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const apiKey = "7ba992048b1c483:y4mkwiph1m9b0jm";
    const allCountries = ["mexico", "sweden", "new zealand", "thailand"];
    const allIndicators = ["population", "gdp", "unemployment", "inflation", "interest rate"];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        if (!apiKey) {
            setError("Api Key not found");
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const indicatorsData = await getIndicatorsData(selectedCountries, selectedIndicators, dateFrom, dateTo, apiKey);
                setData(indicatorsData?.slice(0, -1) || null);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dateFrom, dateTo, selectedCountries, selectedIndicators]);

    useEffect(() => {
        if (!apiKey) {
            setError("Api Key not found");
            return;
        }
        const fetchNewsData = async () => {
            setLoading(true);
            setError(null);
            try {
                setTimeout(async () => {
                    const newsData = await getNewsData(selectedCountries[0], newsDateFrom, newsDateTo, apiKey);
                    setNews(newsData);
                    console.log(newsData, "new data");
                }, 3000);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsData();
    }, [newsDateFrom, newsDateTo, selectedCountries]);



    return (
        <div className="flex min-h-screen bg-background">
            <div className="flex-1 flex flex-col space-y-8 p-8">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-primary">My Economic Snapshot</h2>
                        <p className="text-sm text-muted-foreground">Powered by Trading Economics</p>
                    </div>
                  <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                      {theme === "light" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
                  </Button>
                </div>
              <IndicatorsSection
                  selectedCountries={selectedCountries}
                  setSelectedCountries={setSelectedCountries}
                  selectedIndicators={selectedIndicators}
                  setSelectedIndicators={setSelectedIndicators}
                  data={data}
                  setData={setData}
                  dateFrom={dateFrom}
                  setDateFrom={setDateFrom}
                  dateTo={dateTo}
                  setDateTo={setDateTo}
                  loading={loading}
                  error={error}
                  allCountries={allCountries}
                  allIndicators={allIndicators}
                apiKey={apiKey}
              />
            </div>
            <NewsSection
                news={news}
                setNews={setNews}
                newsDateFrom={newsDateFrom}
                setNewsDateFrom={setNewsDateFrom}
                newsDateTo={newsDateTo}
                setNewsDateTo={setNewsDateTo}
                loading={loading}
                selectedCountries={selectedCountries}
                error={error}
              apiKey={apiKey}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
            />
        </div>
    );
}