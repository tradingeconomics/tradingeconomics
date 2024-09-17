import { useQuery } from "@tanstack/react-query";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import LoadingSkeleton from "@/components/loading";
import FetchError from "@/components/error";
import DataTable from "@/components/markets/data-table";
import { Market, columns } from "@/components/markets/columns";
import { useCountry } from "@/hooks/useCountry";
import { formatDateTime, formatValue } from "@/lib/utils";

const apiBaseUrl = "https://api.tradingeconomics.com";
const apiKey = import.meta.env.VITE_APP_TE_API_KEY;

export default function App() {
  const { country } = useCountry();
  const { data, error, status, refetch } = useQuery<Record<string, string>[]>({
    queryKey: [`/search/${country}`],
    queryFn: () => fetchMarkets(country as string),
  });

  const markets = data ? formatData(data) : [];

  return (
    <>
      <Header />
      <main className="flex-1 max-w-5xl mx-auto space-y-8 w-full">
        <Card className="w-full border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl capitalize">
              Markets in {country}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {status === "pending" ? (
              <LoadingSkeleton />
            ) : status === "error" ? (
              <FetchError error={error} handleRefetch={() => refetch()} />
            ) : (
              <DataTable columns={columns} data={markets} />
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}

const marketsQuery = { c: apiKey as string, category: "markets" };
const mqs = new URLSearchParams(marketsQuery).toString();

async function fetchMarkets(country: string) {
  const markets = await fetch(`${apiBaseUrl}/search/${country}?${mqs}`);
  const contentType = markets.headers.get("content-type");

  if (!markets.ok && contentType?.includes("text/plain")) {
    const message = await markets.text();
    throw new Error(message);
  }

  return markets.json();
}

function formatData(data: Record<string, string>[]) {
  return data.slice(0, data.length - 1).map((market) => {
    return {
      symbol: market["Symbol"],
      ticker: market["Ticker"],
      name: market["Name"],
      type: market["Type"],
      state: market["state"],
      last: formatValue(Number(market["Last"])),
      close: formatValue(Number(market["Close"])),
      closeDate: formatDateTime(market["CloseDate"]),
      marketCap: formatValue(
        Number(market["MarketCap"]),
        market["unit"],
        market["Type"],
        true
      ),
      url: market["URL"],
      dailyChange: formatValue(Number(market["DailyPercentualChange"])),
      yesterday: formatValue(Number(market["yesterday"])),
      lastUpdate: formatDateTime(market["LastUpdate"]),
    } as Market;
  });
}
