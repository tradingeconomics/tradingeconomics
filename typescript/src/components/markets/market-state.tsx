import { cn } from "@/lib/utils";

export type MarketState = "OPEN" | "CLOSED";

export function MarketState({ state }: { state: MarketState }) {
  return (
    <span
      className={cn(
        "px-1 py-px rounded-full border text-xs lowercase",
        state === "OPEN"
          ? "bg-green-100 text-green-600 border-green-100 dark:bg-green-900 dark:text-green-400 dark:border-green-950"
          : state === "CLOSED"
          ? "bg-red-100 text-red-600 border dark:bg-red-900 dark:text-red-400 dark:border-red-950"
          : "bg-yellow-100 text-yellow-600 border dark:bg-yellow-900 dark:text-yellow-400 dark:border-yellow-950"
      )}
    >
      {state}
    </span>
  );
}