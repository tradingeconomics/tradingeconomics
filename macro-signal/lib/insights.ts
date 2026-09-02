import type { HistoricalPoint } from "@/lib/te";

type SeriesInput = {
  country: string;
  points: HistoricalPoint[];
};

function sortedPoints(points: HistoricalPoint[]): HistoricalPoint[] {
  return [...points].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

function consecutiveDirectionInsight(
  country: string,
  indicatorName: string,
  points: HistoricalPoint[],
): string | null {
  const sorted = sortedPoints(points);
  if (sorted.length < 3) return null;

  let streak = 1;
  const last = sorted.at(-1)!;
  const prev = sorted.at(-2)!;
  const direction = last.value > prev.value ? "up" : last.value < prev.value ? "down" : null;
  if (!direction) return null;

  for (let i = sorted.length - 2; i > 0; i--) {
    const current = sorted[i].value;
    const previous = sorted[i - 1].value;
    const step =
      current > previous ? "up" : current < previous ? "down" : "flat";
    if (step !== direction) break;
    streak++;
  }

  if (streak < 2) return null;

  const verb = direction === "up" ? "risen" : "declined";
  return `${country} ${indicatorName} has ${verb} for ${streak} consecutive readings`;
}

function crossoverInsight(
  seriesA: SeriesInput,
  seriesB: SeriesInput,
  indicatorName: string,
): string | null {
  const mapA = new Map(
    sortedPoints(seriesA.points).map((p) => [
      new Date(p.date).getFullYear(),
      p.value,
    ]),
  );
  const mapB = new Map(
    sortedPoints(seriesB.points).map((p) => [
      new Date(p.date).getFullYear(),
      p.value,
    ]),
  );

  const years = [...mapA.keys()].filter((y) => mapB.has(y)).sort((a, b) => a - b);
  if (years.length < 2) return null;

  let crossoverYear: number | null = null;

  for (let i = 1; i < years.length; i++) {
    const year = years[i];
    const prevYear = years[i - 1];
    const aNow = mapA.get(year)!;
    const bNow = mapB.get(year)!;
    const aPrev = mapA.get(prevYear)!;
    const bPrev = mapB.get(prevYear)!;

    const wasBelow = aPrev < bPrev;
    const nowAbove = aNow > bNow;
    const wasAbove = aPrev > bPrev;
    const nowBelow = aNow < bNow;

    if ((wasBelow && nowAbove) || (wasAbove && nowBelow)) {
      crossoverYear = year;
    }
  }

  if (crossoverYear == null) return null;

  const latestYear = years.at(-1)!;
  const leader =
    mapA.get(latestYear)! > mapB.get(latestYear)!
      ? seriesA.country
      : seriesB.country;

  return `${leader}'s ${indicatorName} overtook the other in ${crossoverYear}`;
}

function latestComparisonInsight(
  seriesA: SeriesInput,
  seriesB: SeriesInput,
  indicatorName: string,
): string {
  const a = sortedPoints(seriesA.points).at(-1);
  const b = sortedPoints(seriesB.points).at(-1);

  if (!a || !b) {
    return `No data available for this ${indicatorName} comparison`;
  }

  const year = new Date(a.date).getFullYear();
  const diff = Math.abs(a.value - b.value).toFixed(2);
  const leader = a.value >= b.value ? seriesA.country : seriesB.country;
  const trailer = leader === seriesA.country ? seriesB.country : seriesA.country;

  return `${leader} leads ${trailer} on ${indicatorName} by ${diff} (${year})`;
}

export function computeInsight(
  seriesA: SeriesInput,
  seriesB: SeriesInput,
  indicatorName: string,
): string {
  const consecutive =
    consecutiveDirectionInsight(seriesA.country, indicatorName, seriesA.points) ??
    consecutiveDirectionInsight(seriesB.country, indicatorName, seriesB.points);

  if (consecutive) return consecutive;

  const crossover = crossoverInsight(seriesA, seriesB, indicatorName);
  if (crossover) return crossover;

  return latestComparisonInsight(seriesA, seriesB, indicatorName);
}

export function chartPoints(points: HistoricalPoint[]): { year: number; value: number }[] {
  const cutoff = new Date().getFullYear() - 25;
  return sortedPoints(points)
    .filter((p) => new Date(p.date).getFullYear() >= cutoff)
    .map((p) => ({
      year: new Date(p.date).getFullYear(),
      value: p.value,
    }));
}

export function mergeChartSeries(
  seriesA: { country: string; points: HistoricalPoint[] },
  seriesB: { country: string; points: HistoricalPoint[] },
): { year: number; a: number | null; b: number | null }[] {
  const aPoints = chartPoints(seriesA.points);
  const bPoints = chartPoints(seriesB.points);
  const years = [...new Set([...aPoints.map((p) => p.year), ...bPoints.map((p) => p.year)])].sort(
    (x, y) => x - y,
  );

  const mapA = new Map(aPoints.map((p) => [p.year, p.value]));
  const mapB = new Map(bPoints.map((p) => [p.year, p.value]));

  return years.map((year) => ({
    year,
    a: mapA.get(year) ?? null,
    b: mapB.get(year) ?? null,
  }));
}
