import "server-only";

import {
  FRED_BOND_YIELD_CODE,
  FRED_POLICY_RATE_CODE,
  isFredIndicator,
} from "@/lib/catalog";
import type { HistoricalPoint, SnapshotRow } from "@/lib/data";
import { DataApiError } from "@/lib/data";
import { mockGetHistorical, mockGetSnapshot } from "@/lib/mock";
import { parseSymbol, snapshotsFromHistorical, observationIso } from "@/lib/providers";

const BASE_URL = "https://api.stlouisfed.org/fred/series/observations";
const OBSERVATION_START = "2000-01-01";

/** Shown when DEU/FRA/ITA use the shared ECB deposit facility rate. */
export const EURO_POLICY_RATE_FOOTNOTE =
  "Euro area members shown at the ECB policy rate";

export type FredSeriesConfig = {
  seriesId: string;
  fallbackFrom?: string;
  note?: string;
};

/**
 * Verified live against FRED (Jul 2026). Specified IRSTCB01* OECD series were
 * missing or discontinued; fallbacks noted per country.
 */
export const FRED_POLICY_SERIES: Record<string, FredSeriesConfig> = {
  usa: {
    seriesId: "DFEDTARU",
    fallbackFrom: "IRSTCB01USM156N",
    note: "Federal Funds Target Range (upper limit)",
  },
  can: {
    seriesId: "IRSTCI01CAM156N",
    fallbackFrom: "IRSTCB01CAM156N",
  },
  jpn: {
    seriesId: "IRSTCI01JPM156N",
    fallbackFrom: "IRSTCB01JPM156N",
  },
  gbr: {
    seriesId: "IUDSOIA",
    fallbackFrom: "IRSTCB01GBM156N",
    note: "SONIA overnight rate (BoE policy rate series discontinued on FRED)",
  },
  deu: {
    seriesId: "ECBDFR",
    fallbackFrom: "IRSTCB01DEM156N",
    note: EURO_POLICY_RATE_FOOTNOTE,
  },
  fra: {
    seriesId: "ECBDFR",
    fallbackFrom: "IRSTCB01FRM156N",
    note: EURO_POLICY_RATE_FOOTNOTE,
  },
  ita: {
    seriesId: "ECBDFR",
    fallbackFrom: "IRSTCB01ITM156N",
    note: EURO_POLICY_RATE_FOOTNOTE,
  },
};

/** Verified live against FRED (Jul 2026) — OECD 10Y government bond yields. */
export const FRED_BOND_SERIES: Record<string, FredSeriesConfig> = {
  usa: { seriesId: "IRLTLT01USM156N" },
  can: { seriesId: "IRLTLT01CAM156N" },
  jpn: { seriesId: "IRLTLT01JPM156N" },
  deu: { seriesId: "IRLTLT01DEM156N" },
  fra: { seriesId: "IRLTLT01FRM156N" },
  gbr: { seriesId: "IRLTLT01GBM156N" },
  ita: { seriesId: "IRLTLT01ITM156N" },
};

const FRED_SERIES_BY_INDICATOR: Record<string, Record<string, FredSeriesConfig>> =
  {
    [FRED_POLICY_RATE_CODE]: FRED_POLICY_SERIES,
    [FRED_BOND_YIELD_CODE]: FRED_BOND_SERIES,
  };

type FredObservation = {
  date: string;
  value: string;
};

export class FredApiError extends DataApiError {
  constructor(message: string, status: number, url: string) {
    super(message, status, url);
    this.name = "FredApiError";
  }
}

function downsampleToAnnual(
  symbol: string,
  observations: FredObservation[],
): HistoricalPoint[] {
  const valid = observations
    .filter((row) => row.value !== ".")
    .map((row) => ({
      date: row.date,
      value: Number.parseFloat(row.value),
    }))
    .filter((row) => !Number.isNaN(row.value));

  const byYear = new Map<number, { date: string; value: number }>();

  for (const obs of valid) {
    const date = new Date(`${obs.date}T00:00:00`);
    const year = date.getFullYear();
    const month = date.getMonth();
    const existing = byYear.get(year);

    if (!existing) {
      byYear.set(year, obs);
      continue;
    }

    const existingMonth = new Date(`${existing.date}T00:00:00`).getMonth();
    const existingIsDec = existingMonth === 11;
    const obsIsDec = month === 11;

    if (obsIsDec && !existingIsDec) {
      byYear.set(year, obs);
      continue;
    }

    if (obsIsDec === existingIsDec && obs.date > existing.date) {
      byYear.set(year, obs);
    }
  }

  return [...byYear.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, obs]) => ({
      symbol,
      date: observationIso(obs.date),
      value: obs.value,
    }));
}

async function fredFetchSeries(seriesId: string): Promise<FredObservation[]> {
  const apiKey = process.env.FRED_API_KEY;
  if (!apiKey) {
    throw new FredApiError("FRED_API_KEY is not configured", 503, BASE_URL);
  }

  const params = new URLSearchParams({
    series_id: seriesId,
    api_key: apiKey,
    file_type: "json",
    observation_start: OBSERVATION_START,
  });
  const url = `${BASE_URL}?${params.toString()}`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    const body = await response.text();
    const snippet = body.replace(/\s+/g, " ").trim().slice(0, 200);
    throw new FredApiError(
      `FRED API error (${response.status}): ${snippet}`,
      response.status,
      url,
    );
  }

  const payload = (await response.json()) as {
    observations?: FredObservation[];
    error_message?: string;
  };

  if (payload.error_message) {
    throw new FredApiError(payload.error_message, 400, url);
  }

  return payload.observations ?? [];
}

function filterFredSymbols(symbols: string[]): string[] {
  return symbols.filter((symbol) => {
    const { code } = parseSymbol(symbol);
    return isFredIndicator(code);
  });
}

/** Without an API key, FRED indicators are served from bundled fixtures. */
function shouldUseFredFixtures(): boolean {
  return !process.env.FRED_API_KEY;
}

export async function fredGetHistorical(
  symbols: string[],
): Promise<HistoricalPoint[]> {
  const fredSymbolsList = filterFredSymbols(symbols);
  if (fredSymbolsList.length === 0) return [];

  if (shouldUseFredFixtures()) {
    console.warn(
      "[fred] FRED_API_KEY missing — falling back to fixtures for FRED indicators",
    );
    return mockGetHistorical(fredSymbolsList);
  }

  const pointsBySymbol = new Map<string, HistoricalPoint[]>();

  await Promise.all(
    fredSymbolsList.map(async (symbol) => {
      const { iso3, code } = parseSymbol(symbol);
      const seriesMap = FRED_SERIES_BY_INDICATOR[code];
      const config = seriesMap?.[iso3];
      if (!config) {
        pointsBySymbol.set(symbol, []);
        return;
      }

      const observations = await fredFetchSeries(config.seriesId);
      pointsBySymbol.set(symbol, downsampleToAnnual(symbol, observations));
    }),
  );

  return symbols.flatMap((symbol) => pointsBySymbol.get(symbol) ?? []);
}

export async function fredGetSnapshot(symbols: string[]): Promise<SnapshotRow[]> {
  const fredSymbolsList = filterFredSymbols(symbols);
  if (fredSymbolsList.length === 0) return [];

  if (shouldUseFredFixtures()) {
    console.warn(
      "[fred] FRED_API_KEY missing — falling back to fixtures for FRED indicators",
    );
    return mockGetSnapshot(fredSymbolsList);
  }

  const historical = await fredGetHistorical(fredSymbolsList);
  return snapshotsFromHistorical(fredSymbolsList, historical);
}

export function policyRateFootnotes(iso3List: string[]): string[] {
  const notes = new Set<string>();
  for (const iso3 of iso3List) {
    const note = FRED_POLICY_SERIES[iso3]?.note;
    if (note) notes.add(note);
  }
  return [...notes];
}
