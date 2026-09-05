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
      const response = await fetch(`/api/indicators?country=${country}`);
      if (!response.ok) throw new Error("Loading data Failed");
      const json: EconomicIndicator[] = await response.json();
      setData(json);
      setSelectedIndicator(json[0] || {});
    } catch (error) {
      console.error("Load error:", error);
      setError("Failed to fetch data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData(selectedCountry);
  }, [selectedCountry]);

  return (
    <div className="flex flex-col gap-4 p-12 bg-gray-200">
      <h1 className="text-center font-bold  text-3xl">Trading Economics Indicators Dashboard</h1>
      {/* Dropdown */}
      <CountriesList 
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        countries={countries}
        error={error}
      />
      {/* Charts Section */}
      <div className=" gap-6 grid grid-cols-1 md:grid-cols-2">
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
