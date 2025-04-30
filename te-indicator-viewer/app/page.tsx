"use client";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { EconomicIndicator, SortConfig } from "../types/index";
import BarData from "@/components/BarData";
import PieCart from "@/components/PieCart";
import TableData from "@/components/TableData";
import CountriesList from "@/components/CountriesList";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const countries = ["mexico", "sweden", "thailand", "new zealand"];

export default function Home() {
  const [data, setData] = useState<EconomicIndicator[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("mexico");
  const [selectedIndicator, setSelectedIndicator] = useState<Partial<EconomicIndicator>>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "Title", direction: "asc" });
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 10;

  const fetchData = async (country: string) => {
    try {
      setError(null);
      const res = await fetch(`/api/economic-data?country=${country}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json: EconomicIndicator[] = await res.json();
      setData(json);
      setSelectedIndicator(json[0] || {});
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData(selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="w-full p-10 bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Trading Economics Indicators Dashboard</h1>
      {/* Dropdown */}
      <CountriesList 
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countries={countries}
        error={error}
      />
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <PieCart data={data} />
        <BarData
          data={data}
          selectedIndicator={selectedIndicator}
          onSelectIndicator={setSelectedIndicator}
        />
      </div>

      {/* Table Section */}
      <TableData
        data={data}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        filter={filter}
        setFilter={setFilter}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
      />
    </div>
  );
}
