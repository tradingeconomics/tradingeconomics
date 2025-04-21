import MarketCard, { marketProps } from "@/components/Markets/MarketCard";
import SectionHeader from "@/components/shared/SectionHeader";
import { Input } from "@/components/ui/input";
import { key } from "@/utils/keys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const MarketsPage = () => {
  const [country, setCountry] = useState("");

  const { data, isLoading, isError } = useQuery({
    enabled: country.length > 0, // Avoid auto-fetching when country is empty
    refetchOnWindowFocus: true,
    queryKey: ["markets", country],
    queryFn: async () => {
      const res = await axios.get(
        `https://api.tradingeconomics.com/markets/stocks/country/${country}?c=${key}`
      );
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div className="p-4 overflow-ellipsis">
      <SectionHeader title="Markets" />
      <Input
        className="mt-6 w-[200px]"
        placeholder="Write your country"
        onChange={(e) => setCountry(e.target.value)}
      />

      <section className="mt-4 mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data</p>}
        {data?.length === 0 && <h1>No data found</h1>}
        {data?.map((m: marketProps, index: number) => (
          <MarketCard
            Symbol={m.Symbol}
            CloseDate={m.CloseDate}
            Country={m.Country}
            Ticker={m.Ticker}
            Group={m.Group}
            key={index}
          />
        ))}
      </section>
    </div>
  );
};

export default MarketsPage;
