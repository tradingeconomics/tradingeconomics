"use server";

import { HistoricalDataAPIService } from "@/lib/api";
import { SUPPORTED_COUNTRIES, SUPPORTED_INDICATORS} from "@/utils/constants";
import TimeSeriesChart from "@/app/components/TimeSeriesChart";

export default async function Home() {
  const historicalDataService = new HistoricalDataAPIService()
  const gdp_data = await historicalDataService.getDataByCountry(
    SUPPORTED_COUNTRIES.THAILAND, 
    SUPPORTED_INDICATORS.GDP
  );
  
  const chartData = gdp_data.map((item: any) => ({
    date: new Date(item.DateTime).getFullYear().toString(),
    value: item.Value
  }));

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-100">Thailand GDP (USD $) </h1>
      <div className="w-full max-w-4xl h-96 min-w-[600px]">
        <TimeSeriesChart data={chartData} />
      </div>
    </div>
  );
}
