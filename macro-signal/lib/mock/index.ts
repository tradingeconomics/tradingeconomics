import fixtures from "@/lib/mock/fixtures.json";
import type { HistoricalPoint, SnapshotRow } from "@/lib/data";

type Fixtures = {
  snapshots: SnapshotRow[];
  historical: Record<string, HistoricalPoint[]>;
};

const data = fixtures as Fixtures;

export function mockGetHistorical(symbols: string[]): HistoricalPoint[] {
  return symbols.flatMap((symbol) => data.historical[symbol] ?? []);
}

export function mockGetSnapshot(symbols: string[]): SnapshotRow[] {
  const set = new Set(symbols);
  return data.snapshots.filter((row) => set.has(row.symbol));
}
