"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useIsDark } from "@/lib/use-is-dark";
import { Card, CardContent } from "@/components/ui/card";

const flatCard = "rounded-sm border shadow-none ring-0";

const LINE_A_COLOR = "var(--foreground)";
const LINE_B_COLOR = "var(--subtle)";
const LINE_B_DASH = "6 4";

type ComparisonChartProps = {
  data: { year: number; a: number | null; b: number | null }[];
  labelA: string;
  labelB: string;
  unit: string;
};

type LegendEntry = {
  value: string;
  color?: string;
  dataKey?: string;
};

function ChartLegend({
  payload,
  mutedColor,
}: {
  payload?: LegendEntry[];
  mutedColor: string;
}) {
  if (!payload?.length) return null;

  return (
    <ul
      className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs"
      style={{ color: mutedColor }}
    >
      {payload.map((entry) => {
        const isB = entry.dataKey === "b";
        const stroke = isB ? LINE_B_COLOR : LINE_A_COLOR;

        return (
          <li key={String(entry.value)} className="flex items-center gap-2">
            <svg width="28" height="10" className="shrink-0" aria-hidden="true">
              <line
                x1="0"
                y1="5"
                x2="28"
                y2="5"
                stroke={stroke}
                strokeWidth="2"
                strokeDasharray={isB ? LINE_B_DASH : undefined}
              />
            </svg>
            <span>{entry.value}</span>
          </li>
        );
      })}
    </ul>
  );
}

const YEAR_TICK_STEP = 5;

function fixedYearTicks(years: number[], step = YEAR_TICK_STEP): number[] {
  if (years.length === 0) return [];

  const min = Math.min(...years);
  const max = Math.max(...years);
  const start = Math.floor(min / step) * step;
  const ticks: number[] = [];

  for (let year = start; year <= max; year += step) {
    ticks.push(year);
  }

  return ticks;
}

export function ComparisonChart({
  data,
  labelA,
  labelB,
  unit,
}: ComparisonChartProps) {
  const isDark = useIsDark();

  const grid = isDark ? "#2a2a2a" : "#e5e5e5";
  const tick = isDark ? "#b0b0b0" : "#737373";
  const axis = isDark ? "#3a3a3a" : "#d4d4d4";
  const tooltipBg = isDark ? "#222222" : "#ffffff";
  const tooltipBorder = isDark ? "#3a3a3a" : "#d4d4d4";
  const tooltipText = isDark ? "#ffffff" : "#1c1917";

  const yearTicks = useMemo(
    () => fixedYearTicks(data.map((row) => row.year)),
    [data],
  );

  if (data.length === 0 || data.every((row) => row.a == null && row.b == null)) {
    return (
      <Card className={flatCard}>
        <CardContent className="flex h-72 items-center justify-center text-sm text-muted-foreground sm:h-96">
          No data available for this combination
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${flatCard} py-0`}>
      <CardContent className="h-72 p-4 sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={grid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            type="number"
            dataKey="year"
            domain={["dataMin", "dataMax"]}
            ticks={yearTicks}
            allowDecimals={false}
            tick={{ fill: tick, fontSize: 12 }}
            axisLine={{ stroke: axis }}
            tickLine={{ stroke: axis }}
          />
          <YAxis
            tick={{ fill: tick, fontSize: 12 }}
            axisLine={{ stroke: axis }}
            tickLine={{ stroke: axis }}
            width={48}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: 0,
              boxShadow: "none",
              fontSize: 12,
              color: tooltipText,
            }}
            formatter={(value) =>
              typeof value === "number" ? [`${value.toFixed(2)} ${unit}`, ""] : ["—", ""]
            }
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend
            content={<ChartLegend mutedColor={tick} />}
          />
          <Line
            type="linear"
            dataKey="a"
            name={labelA}
            stroke={LINE_A_COLOR}
            strokeWidth={2}
            dot={false}
            connectNulls
          />
          <Line
            type="linear"
            dataKey="b"
            name={labelB}
            stroke={LINE_B_COLOR}
            strokeWidth={2}
            strokeDasharray={LINE_B_DASH}
            dot={false}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
