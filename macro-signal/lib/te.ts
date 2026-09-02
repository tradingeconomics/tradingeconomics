import "server-only";

import type { HistoricalPoint, SnapshotRow } from "@/lib/data";
import { DataApiError } from "@/lib/data";
import { indicatorByCode, indicatorSource, type DataSource } from "@/lib/catalog";
import { isMockEnabled } from "@/lib/env";
import { fredGetHistorical, fredGetSnapshot } from "@/lib/fred";
import { imfGetHistorical, imfGetSnapshot } from "@/lib/imf";
import { mockGetHistorical, mockGetSnapshot } from "@/lib/mock";
import { wbGetHistorical, wbGetSnapshot } from "@/lib/wb";

export type { HistoricalPoint, SnapshotRow } from "@/lib/data";
export { DataApiError as TeApiError } from "@/lib/data";

type ProviderFns = {
  getHistorical: (symbols: string[]) => Promise<HistoricalPoint[]>;
  getSnapshot: (symbols: string[]) => Promise<SnapshotRow[]>;
};

const PROVIDERS: Record<DataSource, ProviderFns> = {
  worldbank: {
    getHistorical: wbGetHistorical,
    getSnapshot: wbGetSnapshot,
  },
  imf: {
    getHistorical: imfGetHistorical,
    getSnapshot: imfGetSnapshot,
  },
  fred: {
    getHistorical: fredGetHistorical,
    getSnapshot: fredGetSnapshot,
  },
};

function parseSymbolCode(symbol: string): string {
  const dot = symbol.indexOf(".");
  return dot > 0 ? symbol.slice(dot + 1) : symbol;
}

/**
 * Groups symbols by indicator code so each indicator's provider call can fail
 * independently — one provider outage degrades a single indicator to the
 * bundled snapshot while everything else keeps rendering live.
 */
function splitSymbolsByIndicator(symbols: string[]): Map<string, string[]> {
  const buckets = new Map<string, string[]>();

  for (const symbol of symbols) {
    const code = parseSymbolCode(symbol);
    const bucket = buckets.get(code) ?? [];
    bucket.push(symbol);
    buckets.set(code, bucket);
  }

  return buckets;
}

/** Logs why an indicator degraded to bundled fixtures. */
function logFallback(code: string, error: unknown): void {
  const name = indicatorByCode(code)?.name ?? code;
  const status = error instanceof DataApiError ? error.status : "unknown";
  console.warn(
    `[fallback] ${name} unavailable (${status}) — serving bundled snapshot for ${name}`,
  );
}

async function fetchHistoricalFromProviders(
  buckets: Map<string, string[]>,
): Promise<HistoricalPoint[]> {
  const results = await Promise.all(
    [...buckets.entries()].map(async ([code, codeSymbols]) => {
      const source = indicatorSource(code);
      try {
        return await PROVIDERS[source].getHistorical(codeSymbols);
      } catch (error) {
        logFallback(code, error);
        return mockGetHistorical(codeSymbols);
      }
    }),
  );

  return results.flat();
}

async function fetchSnapshotFromProviders(
  buckets: Map<string, string[]>,
): Promise<SnapshotRow[]> {
  const results = await Promise.all(
    [...buckets.entries()].map(async ([code, codeSymbols]) => {
      const source = indicatorSource(code);
      try {
        return await PROVIDERS[source].getSnapshot(codeSymbols);
      } catch (error) {
        logFallback(code, error);
        return mockGetSnapshot(codeSymbols);
      }
    }),
  );

  return results.flat();
}

export async function getHistorical(
  symbols: string[],
): Promise<HistoricalPoint[]> {
  if (symbols.length === 0) {
    return [];
  }

  if (isMockEnabled()) {
    return mockGetHistorical(symbols);
  }

  const buckets = splitSymbolsByIndicator(symbols);
  return fetchHistoricalFromProviders(buckets);
}

export async function getSnapshot(symbols: string[]): Promise<SnapshotRow[]> {
  if (symbols.length === 0) {
    return [];
  }

  if (isMockEnabled()) {
    return mockGetSnapshot(symbols);
  }

  const buckets = splitSymbolsByIndicator(symbols);
  return fetchSnapshotFromProviders(buckets);
}
