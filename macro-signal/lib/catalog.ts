export type IndicatorGroupId =
  | "growth-prices"
  | "labour-rates"
  | "external-fiscal"
  | "sovereign";

export type DataSource = "worldbank" | "imf" | "fred";

export type Country = {
  iso3: string;
  name: string;
};

export type IndicatorValence = "higher-good" | "higher-bad" | "neutral";

export type Indicator = {
  code: string;
  name: string;
  unit: string;
  group: IndicatorGroupId;
  source: DataSource;
  valence: IndicatorValence;
};

export const IMF_DEBT_CODE = "ggxwdg_ngdp";
export const FRED_POLICY_RATE_CODE = "policy.int.rate";
export const FRED_BOND_YIELD_CODE = "bond.yield.10y";

export const INDICATOR_GROUPS: { id: IndicatorGroupId; label: string }[] = [
  { id: "growth-prices", label: "Growth & prices" },
  { id: "labour-rates", label: "Labour & rates" },
  { id: "external-fiscal", label: "External & fiscal" },
  { id: "sovereign", label: "Sovereign" },
];

/** Two display rows of four cards, preserving group order left-to-right. */
export const INDICATOR_CARD_ROWS: {
  label: string;
  groupIds: IndicatorGroupId[];
}[] = [
  {
    label: "Growth & prices · Labour & rates",
    groupIds: ["growth-prices", "labour-rates"],
  },
  {
    label: "External & fiscal · Sovereign",
    groupIds: ["external-fiscal", "sovereign"],
  },
];

export const COUNTRIES: Country[] = [
  { iso3: "can", name: "Canada" },
  { iso3: "fra", name: "France" },
  { iso3: "deu", name: "Germany" },
  { iso3: "ita", name: "Italy" },
  { iso3: "jpn", name: "Japan" },
  { iso3: "gbr", name: "United Kingdom" },
  { iso3: "usa", name: "United States" },
];

/** Frozen catalog — 8 indicators, single source of truth. */
export const INDICATORS: Indicator[] = [
  {
    code: "ny.gdp.mktp.kd.zg",
    name: "GDP Growth",
    unit: "%",
    group: "growth-prices",
    source: "worldbank",
    valence: "higher-good",
  },
  {
    code: "fp.cpi.totl.zg",
    name: "Inflation (CPI)",
    unit: "%",
    group: "growth-prices",
    source: "worldbank",
    valence: "higher-bad",
  },
  {
    code: "sl.uem.totl.zs",
    name: "Unemployment",
    unit: "%",
    group: "labour-rates",
    source: "worldbank",
    valence: "higher-bad",
  },
  {
    code: FRED_POLICY_RATE_CODE,
    name: "Interest Rate",
    unit: "%",
    group: "labour-rates",
    source: "fred",
    valence: "neutral",
  },
  {
    code: "ne.rsb.gnfs.zs",
    name: "Balance of Trade",
    unit: "% of GDP",
    group: "external-fiscal",
    source: "worldbank",
    valence: "neutral",
  },
  {
    code: "bn.cab.xoka.gd.zs",
    name: "Current Account",
    unit: "% of GDP",
    group: "external-fiscal",
    source: "worldbank",
    valence: "neutral",
  },
  {
    code: IMF_DEBT_CODE,
    name: "Government Debt",
    unit: "% of GDP",
    group: "sovereign",
    source: "imf",
    valence: "higher-bad",
  },
  {
    code: FRED_BOND_YIELD_CODE,
    name: "10Y Bond Yield",
    unit: "%",
    group: "sovereign",
    source: "fred",
    valence: "neutral",
  },
];

/** Fixed headline indicators for the first G7 glance table. */
export const G7_GLANCE_INDICATORS: {
  code: string;
  columnLabel: string;
}[] = [
  { code: "ny.gdp.mktp.kd.zg", columnLabel: "GDP Growth" },
  { code: "fp.cpi.totl.zg", columnLabel: "Inflation" },
  { code: "sl.uem.totl.zs", columnLabel: "Unemployment" },
  { code: FRED_POLICY_RATE_CODE, columnLabel: "Interest Rate" },
];

/** External & fiscal / sovereign indicators for the second G7 glance table. */
export const G7_GLANCE_SECONDARY_INDICATORS: {
  code: string;
  columnLabel: string;
}[] = [
  { code: "ne.rsb.gnfs.zs", columnLabel: "Balance of Trade" },
  { code: "bn.cab.xoka.gd.zs", columnLabel: "Current Account" },
  { code: IMF_DEBT_CODE, columnLabel: "Govt Debt" },
  { code: FRED_BOND_YIELD_CODE, columnLabel: "10Y Bond Yield" },
];

export function symbolFor(iso3: string, code: string): string {
  return `${iso3}.${code}`;
}

export function indicatorByCode(code: string): Indicator | undefined {
  return INDICATORS.find((item) => item.code === code);
}

export function indicatorSource(code: string): DataSource {
  return indicatorByCode(code)?.source ?? "worldbank";
}

export function catalogCodeToWb(code: string): string {
  return code.toUpperCase();
}

export function isFredIndicator(code: string): boolean {
  return code === FRED_POLICY_RATE_CODE || code === FRED_BOND_YIELD_CODE;
}
