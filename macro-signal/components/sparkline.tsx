import { deltaDirection } from "@/lib/format";
import type { IndicatorValence } from "@/lib/catalog";
import { valenceSparkColors } from "@/lib/valence";

type SparklineVariant = "linear" | "curve";

type DeltaSparklineProps = {
  actual: number;
  previous: number;
  valence: IndicatorValence;
  className?: string;
  compact?: boolean;
  variant?: SparklineVariant;
};

type Trend = "up" | "down" | "flat";

/** One point of |Actual − Previous| spans the full sparkline height. */
const DELTA_FULL_SCALE = 1;

function trendPoints(
  actual: number,
  previous: number,
  padding: number,
  innerHeight: number,
): { yPrevious: number; yActual: number; trend: Trend } {
  const trend = deltaDirection(actual, previous);
  const midY = padding + innerHeight / 2;

  if (trend === "flat") {
    return { yPrevious: midY, yActual: midY, trend };
  }

  const magnitude = Math.abs(actual - previous);
  const ratio = Math.min(magnitude / DELTA_FULL_SCALE, 1);
  const halfSpan = (innerHeight / 2) * ratio;

  if (trend === "up") {
    return {
      yPrevious: midY + halfSpan,
      yActual: midY - halfSpan,
      trend,
    };
  }

  return {
    yPrevious: midY - halfSpan,
    yActual: midY + halfSpan,
    trend,
  };
}

function trendPath(
  yPrevious: number,
  yActual: number,
  width: number,
  trend: Trend,
  variant: SparklineVariant,
): string {
  if (trend === "flat") {
    const wobble = 1.5;
    return [
      `M 0 ${yActual}`,
      `C ${width * 0.25} ${yActual - wobble}`,
      `${width * 0.75} ${yActual + wobble}`,
      `${width} ${yActual}`,
    ].join(" ");
  }

  if (variant === "linear") {
    return `M 0 ${yPrevious} L ${width} ${yActual}`;
  }

  const span = Math.abs(yActual - yPrevious);
  const bulge = span * 0.35;
  const midY = (yPrevious + yActual) / 2;
  const bulgeY = trend === "up" ? midY + bulge : midY - bulge;

  return [
    `M 0 ${yPrevious}`,
    `C ${width * 0.28} ${bulgeY}`,
    `${width * 0.72} ${bulgeY}`,
    `${width} ${yActual}`,
  ].join(" ");
}

/** Previous → Actual trend; steepness scales with change magnitude. */
export function DeltaSparkline({
  actual,
  previous,
  valence,
  className = "",
  compact = false,
  variant = "curve",
}: DeltaSparklineProps) {
  const width = compact ? 80 : 100;
  const height = compact ? 30 : 44;
  const padding = 4;
  const innerHeight = height - padding * 2;
  const { yPrevious, yActual, trend } = trendPoints(
    actual,
    previous,
    padding,
    innerHeight,
  );
  const colors = valenceSparkColors(valence, actual, previous);
  const path = trendPath(yPrevious, yActual, width, trend, variant);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={`${compact ? "h-[30px] w-20" : "h-11 w-full"} ${className}`}
      aria-hidden="true"
    >
      <path
        d={`${path} L ${width} ${height} L 0 ${height} Z`}
        fill={colors.fill}
      />
      <path
        d={path}
        fill="none"
        stroke={colors.stroke}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={width} cy={yActual} r={2.5} fill={colors.dot} />
    </svg>
  );
}
