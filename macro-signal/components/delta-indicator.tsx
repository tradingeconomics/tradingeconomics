import { deltaDirection, formatDelta } from "@/lib/format";
import type { IndicatorValence } from "@/lib/catalog";
import {
  valenceForCode,
  valenceOutcome,
  type ValenceOutcome,
} from "@/lib/valence";
import { cn } from "@/lib/utils";

const OUTCOME_CLASS: Record<ValenceOutcome, string> = {
  improving: "text-delta-up",
  worsening: "text-delta-down",
  neutral: "text-muted-foreground",
};

type DeltaIndicatorProps = {
  current: number;
  previous: number | null | undefined;
  valence?: IndicatorValence;
  code?: string;
  className?: string;
  showValue?: boolean;
};

function resolveValence(
  valence: IndicatorValence | undefined,
  code: string | undefined,
): IndicatorValence {
  if (valence) return valence;
  if (code) return valenceForCode(code);
  return "neutral";
}

export function DeltaIndicator({
  current,
  previous,
  valence,
  code,
  className,
  showValue = true,
}: DeltaIndicatorProps) {
  const resolvedValence = resolveValence(valence, code);

  if (previous == null || Number.isNaN(previous)) {
    return (
      <span className={cn("tabular-nums text-muted-foreground", className)}>
        —
      </span>
    );
  }

  const colorClass = OUTCOME_CLASS[
    valenceOutcome(resolvedValence, current, previous)
  ];
  const direction = deltaDirection(current, previous);
  const glyph =
    direction === "up" ? "▲" : direction === "down" ? "▼" : "—";

  return (
    <span
      className={cn("inline-flex items-center gap-1 tabular-nums", colorClass, className)}
    >
      <span aria-hidden={direction !== "flat"}>{glyph}</span>
      {showValue ? formatDelta(current, previous) : null}
    </span>
  );
}
