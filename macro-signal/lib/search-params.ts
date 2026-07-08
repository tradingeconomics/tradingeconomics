import { COUNTRIES, INDICATORS } from "@/lib/catalog";

export type PageSearchParams = {
  country?: string;
  glanceCountry?: string;
  chartA?: string;
  chartB?: string;
  chartIndicator?: string;
};

export function resolveSearchParams(params: PageSearchParams) {
  const country = COUNTRIES.some((c) => c.iso3 === params.country)
    ? params.country!
    : "usa";

  const glanceCountry = COUNTRIES.some((c) => c.iso3 === params.glanceCountry)
    ? params.glanceCountry!
    : "usa";

  const chartA = COUNTRIES.some((c) => c.iso3 === params.chartA)
    ? params.chartA!
    : "usa";

  const chartB = COUNTRIES.some((c) => c.iso3 === params.chartB)
    ? params.chartB!
    : "jpn";

  const chartIndicator = INDICATORS.some((i) => i.code === params.chartIndicator)
    ? params.chartIndicator!
    : "fp.cpi.totl.zg";

  return { country, glanceCountry, chartA, chartB, chartIndicator };
}
