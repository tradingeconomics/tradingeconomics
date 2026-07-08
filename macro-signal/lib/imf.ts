import "server-only";

import { COUNTRIES, IMF_DEBT_CODE, symbolFor } from "@/lib/catalog";
import type { HistoricalPoint, SnapshotRow } from "@/lib/data";
import { DataApiError } from "@/lib/data";
import { parseSymbol, snapshotsFromHistorical, yearEndIso, isImfWeoYear } from "@/lib/providers";

const BASE_URL = "https://www.imf.org/external/datamapper/api/v1";
const G7_IMF = COUNTRIES.map((country) => country.iso3.toUpperCase()).join("/");

type ImfValues = Record<string, Record<string, number>>;

export class ImfApiError extends DataApiError {
  constructor(message: string, status: number, url: string) {
    super(message, status, url);
    this.name = "ImfApiError";
  }
}

async function imfFetch(indicatorCode: string): Promise<ImfValues> {
  const imfCode = indicatorCode.toUpperCase();
  const url = `${BASE_URL}/${imfCode}/${G7_IMF}`;

  // IMF's Akamai edge 403s requests with an absent/default Node user agent
  // (notably from datacenter IPs). Present as a browser to get past it.
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    const body = await response.text();
    const snippet = body.replace(/\s+/g, " ").trim().slice(0, 200);
    throw new ImfApiError(
      `IMF DataMapper API error (${response.status}): ${snippet}`,
      response.status,
      url,
    );
  }

  const payload = (await response.json()) as {
    values?: Record<string, ImfValues>;
  };

  return payload.values?.[imfCode] ?? {};
}

function buildHistoricalForCountry(
  symbol: string,
  series: Record<string, number> | undefined,
): HistoricalPoint[] {
  if (!series) return [];

  return Object.entries(series)
    .filter(
      ([year, value]) =>
        isImfWeoYear(year) && value != null && !Number.isNaN(value),
    )
    .map(([year, value]) => ({
      symbol,
      date: yearEndIso(year),
      value,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function groupSymbols(symbols: string[]): Map<string, Set<string>> {
  const byIndicator = new Map<string, Set<string>>();

  for (const symbol of symbols) {
    const { iso3, code } = parseSymbol(symbol);
    if (code !== IMF_DEBT_CODE) continue;
    const countries = byIndicator.get(code) ?? new Set<string>();
    countries.add(iso3);
    byIndicator.set(code, countries);
  }

  return byIndicator;
}

export async function imfGetHistorical(
  symbols: string[],
): Promise<HistoricalPoint[]> {
  if (symbols.length === 0) return [];

  const byIndicator = groupSymbols(symbols);
  const symbolSet = new Set(symbols);
  const pointsBySymbol = new Map<string, HistoricalPoint[]>();

  await Promise.all(
    [...byIndicator.keys()].map(async (code) => {
      const values = await imfFetch(code);

      for (const country of COUNTRIES) {
        const symbol = symbolFor(country.iso3, code);
        if (!symbolSet.has(symbol)) continue;
        const imfIso = country.iso3.toUpperCase();
        pointsBySymbol.set(
          symbol,
          buildHistoricalForCountry(symbol, values[imfIso]),
        );
      }
    }),
  );

  return symbols.flatMap((symbol) => pointsBySymbol.get(symbol) ?? []);
}

export async function imfGetSnapshot(symbols: string[]): Promise<SnapshotRow[]> {
  const historical = await imfGetHistorical(symbols);
  return snapshotsFromHistorical(symbols, historical);
}
