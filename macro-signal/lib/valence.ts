import { indicatorByCode, type IndicatorValence } from "@/lib/catalog";
import { deltaDirection } from "@/lib/format";

export type ValenceOutcome = "improving" | "worsening" | "neutral";

function hasPreviousReading(previous: number | null | undefined): boolean {
  return previous != null && !Number.isNaN(previous);
}

export function valenceOutcome(
  valence: IndicatorValence,
  current: number,
  previous: number | null | undefined,
): ValenceOutcome {
  if (!hasPreviousReading(previous)) return "neutral";
  const prev = previous as number;
  if (valence === "neutral") return "neutral";

  const direction = deltaDirection(current, prev);
  if (direction === "flat") return "neutral";

  if (valence === "higher-good") {
    return direction === "up" ? "improving" : "worsening";
  }

  return direction === "up" ? "worsening" : "improving";
}

export function valenceForCode(code: string): IndicatorValence {
  return indicatorByCode(code)?.valence ?? "neutral";
}

export function valenceClass(
  valence: IndicatorValence,
  current: number,
  previous: number | null | undefined,
): string {
  const outcome = valenceOutcome(valence, current, previous);
  if (outcome === "improving") return "text-delta-up";
  if (outcome === "worsening") return "text-delta-down";
  return "text-muted-foreground";
}

export function valenceClassForCode(
  code: string,
  current: number,
  previous: number | null | undefined,
): string {
  return valenceClass(valenceForCode(code), current, previous);
}

export function valenceSparkColors(
  valence: IndicatorValence,
  current: number,
  previous: number | null | undefined,
): { fill: string; stroke: string; dot: string } {
  const outcome = valenceOutcome(valence, current, previous);

  if (outcome === "improving") {
    return {
      fill: "var(--spark-up-fill)",
      stroke: "var(--spark-up-stroke)",
      dot: "var(--spark-up-dot)",
    };
  }

  if (outcome === "worsening") {
    return {
      fill: "var(--spark-down-fill)",
      stroke: "var(--spark-down-stroke)",
      dot: "var(--spark-down-dot)",
    };
  }

  return {
    fill: "var(--spark-flat-fill)",
    stroke: "var(--spark-flat-stroke)",
    dot: "var(--spark-flat-dot)",
  };
}
