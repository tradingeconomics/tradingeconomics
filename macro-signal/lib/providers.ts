import "server-only";

import { COUNTRIES, indicatorByCode, type Indicator } from "@/lib/catalog";
import { DataApiError, type HistoricalPoint, type SnapshotRow } from "@/lib/data";

/** Splits a `iso3.code` symbol into its parts. */
export function parseSymbol(symbol: string): { iso3: string; code: string } {
  const dot = symbol.indexOf(".");
  if (dot <= 0) {
    throw new DataApiError(`Invalid symbol: ${symbol}`, 400, symbol);
  }
  return { iso3: symbol.slice(0, dot), code: symbol.slice(dot + 1) };
}

/** Normalises a calendar year to the annual observation timestamp used across providers. */
export function yearEndIso(year: number | string): string {
  return `${year}-12-31T00:00:00`;
}

/** Normalises a YYYY-MM-DD (or ISO) observation date to the stored timestamp format. */
export function observationIso(date: string): string {
  const day = date.split("T")[0];
  return `${day}T00:00:00`;
}

export function currentCalendarYear(): number {
  return new Date().getFullYear();
}

/** WEO actuals through 2024; 2025 estimates; 2026+ are projections — never display. */
export const IMF_WEO_MAX_YEAR = 2025;

export function isImfWeoYear(year: number | string): boolean {
  const parsed = Number(year);
  return !Number.isNaN(parsed) && parsed <= IMF_WEO_MAX_YEAR;
}

/** True when a calendar year is not an IMF WEO projection beyond the current year. */
export function isObservedCalendarYear(year: number | string): boolean {
  const parsed = Number(year);
  return !Number.isNaN(parsed) && parsed <= currentCalendarYear();
}

export function indicatorMeta(code: string): Indicator {
  const indicator = indicatorByCode(code);
  if (!indicator) {
    throw new DataApiError(`Unknown indicator code: ${code}`, 400, code);
  }
  return indicator;
}

export function countryName(iso3: string): string {
  return COUNTRIES.find((country) => country.iso3 === iso3)?.name ?? iso3;
}

/** Groups historical points by their symbol. */
export function groupPointsBySymbol(
  points: HistoricalPoint[],
): Map<string, HistoricalPoint[]> {
  const bySymbol = new Map<string, HistoricalPoint[]>();
  for (const point of points) {
    const bucket = bySymbol.get(point.symbol) ?? [];
    bucket.push(point);
    bySymbol.set(point.symbol, bucket);
  }
  return bySymbol;
}

/** Derives a snapshot (latest reading vs. the prior one) from a symbol's history. */
export function buildSnapshotFromHistory(
  symbol: string,
  points: HistoricalPoint[],
): SnapshotRow | null {
  if (points.length === 0) return null;

  const { iso3, code } = parseSymbol(symbol);
  const indicator = indicatorMeta(code);
  const sorted = [...points].sort((a, b) => b.date.localeCompare(a.date));
  const last = sorted[0];
  const previous = sorted[1] ?? sorted[0];
  const name = countryName(iso3);

  return {
    symbol,
    last: last.value,
    date: last.date,
    previous: previous.value,
    previousDate: previous.date,
    country: name,
    category: indicator.group,
    description: indicator.name,
    frequency: "Yearly",
    unit: indicator.unit,
    title: `${name} ${indicator.name}`,
    lastUpdate: last.date,
    consensus: null,
    forecast: null,
  };
}

/** Builds snapshots for the requested symbols from a flat list of historical points. */
export function snapshotsFromHistorical(
  symbols: string[],
  historical: HistoricalPoint[],
): SnapshotRow[] {
  const bySymbol = groupPointsBySymbol(historical);
  return symbols
    .map((symbol) => buildSnapshotFromHistory(symbol, bySymbol.get(symbol) ?? []))
    .filter((row): row is SnapshotRow => row != null);
}
