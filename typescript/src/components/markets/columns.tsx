"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketType, MarketTypes } from "@/components/markets/market-types";
import { MarketState } from "@/components/markets/market-state";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Market = {
  symbol: string;
  ticker: string;
  name: string;
  type: string;
  state: string;
  close: string;
  closeDate: string;
  url: string;
  marketCap: string | null;
  dailyChange: string;
  yesterday: string;
  lastUpdate: string;
};

export const columns: ColumnDef<Market>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "symbol", header: "Symbol" },
  { accessorKey: "ticker", header: "Ticker" },
  { accessorKey: "url", header: "URL" },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const value = row.getValue("type") as MarketTypes;
      return <MarketType type={value} />;
    },
  },
  {
    accessorKey: "marketCap",
    header: () => (
      <div className="text-right whitespace-nowrap">Market Cap</div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue("marketCap") as string;
      return <div className="text-right">{amount || "N/A"}</div>;
    },
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => {
      const value = row.getValue("state") as MarketState;
      return <MarketState state={value} />;
    },
  },
  {
    accessorKey: "close",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-right whitespace-nowrap px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Close Value
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("close"));
      return <div className="text-right">{amount}</div>;
    },
  },
  {
    accessorKey: "yesterday",
    header: () => <div className="text-right whitespace-nowrap">Yesterday</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("yesterday"));
      return <div className="text-right">{amount}</div>;
    },
  },
  {
    accessorKey: "dailyChange",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-right whitespace-nowrap px-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % Daily Change
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("dailyChange"));
      return (
        <div className="text-right">
          {amount > 0 ? (
            <span className="text-green-600 mr-0.5">&uarr;</span>
          ) : (
            <span className="text-red-600 mr-0.5">&darr;</span>
          )}
          {amount}
        </div>
      );
    },
  },
  {
    accessorKey: "closeDate",
    header: () => <div className="whitespace-nowrap">Close Date</div>,
  },
  {
    accessorKey: "lastUpdate",
    header: () => <div className="whitespace-nowrap">Last Update</div>,
  },
];
