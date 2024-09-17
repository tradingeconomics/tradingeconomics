import { cn } from "@/lib/utils";

export type MarketTypes = "bonds" | "currency" | "index" | "stocks";

export function MarketType({ type }: { type: MarketTypes }) {
  return (
    <span
      className={cn(
        "px-1 py-px rounded-full border text-xs lowercase",
        type === "bonds"
          ? "bg-fuchsia-100 text-fuchsia-600 border-fuchsia-100 dark:bg-fuchsia-900 dark:text-fuchsia-400 dark:border-fuchsia-950"
          : type === "currency"
          ? "bg-violet-100 text-violet-600 border dark:bg-violet-900 dark:text-violet-400 dark:border-violet-950"
          : type === "index"
          ? "bg-blue-100 text-blue-600 border dark:bg-blue-900 dark:text-blue-400 dark:border-blue-950"
          : "bg-cyan-100 text-cyan-600 border dark:bg-cyan-900 dark:text-cyan-400 dark:border-cyan-950"
      )}
    >
      {type}
    </span>
  );
}
