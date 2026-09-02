import { ComparisonChart } from "@/components/comparison-chart";
import { countryLabel } from "@/components/country-cards";
import {
  COUNTRIES,
  FRED_POLICY_RATE_CODE,
  INDICATORS,
  symbolFor,
} from "@/lib/catalog";
import { policyRateFootnoteLine } from "@/lib/source-notes";
import { computeInsight, mergeChartSeries } from "@/lib/insights";
import { getHistorical } from "@/lib/te";

type ComparisonPanelProps = {
  chartA: string;
  chartB: string;
  chartIndicator: string;
};

export async function ComparisonPanel({
  chartA,
  chartB,
  chartIndicator,
}: ComparisonPanelProps) {
  const indicator = INDICATORS.find((item) => item.code === chartIndicator);
  const symbolA = symbolFor(chartA, chartIndicator);
  const symbolB = symbolFor(chartB, chartIndicator);
  const historical = await getHistorical([symbolA, symbolB]);

  const pointsA = historical.filter((point) => point.symbol === symbolA);
  const pointsB = historical.filter((point) => point.symbol === symbolB);

  const labelA = countryLabel(chartA);
  const labelB = countryLabel(chartB);
  const unit = indicator?.unit ?? "";

  const chartData = mergeChartSeries(
    { country: labelA, points: pointsA },
    { country: labelB, points: pointsB },
  );

  const insight = computeInsight(
    { country: labelA, points: pointsA },
    { country: labelB, points: pointsB },
    indicator?.name ?? "indicator",
  );

  const footnoteLine =
    chartIndicator === FRED_POLICY_RATE_CODE
      ? policyRateFootnoteLine([chartA, chartB])
      : null;

  return (
    <div className="space-y-4">
      <p className="border-l-2 border-foreground pl-4 text-sm leading-relaxed text-muted-foreground">
        {insight}
      </p>
      <ComparisonChart
        data={chartData}
        labelA={labelA}
        labelB={labelB}
        unit={unit}
      />
      {footnoteLine ? (
        <p className="text-[11px] leading-snug text-muted-foreground">
          {footnoteLine}
        </p>
      ) : null}
    </div>
  );
}

export const countryOptions = COUNTRIES.map((country) => ({
  value: country.iso3,
  label: country.name,
}));

export const indicatorOptions = INDICATORS.map((indicator) => ({
  value: indicator.code,
  label: indicator.name,
}));
