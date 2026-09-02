/**
 * Generates lib/mock/fixtures.json — snapshot + historical data
 * for every catalog country × indicator combination.
 * Run: node scripts/generate-mock-fixtures.mjs
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const COUNTRIES = [
  { iso3: "can", name: "Canada" },
  { iso3: "fra", name: "France" },
  { iso3: "deu", name: "Germany" },
  { iso3: "ita", name: "Italy" },
  { iso3: "jpn", name: "Japan" },
  { iso3: "gbr", name: "United Kingdom" },
  { iso3: "usa", name: "United States" },
];

const INDICATORS = [
  {
    code: "ny.gdp.mktp.kd.zg",
    name: "GDP Growth",
    unit: "%",
    category: "growth-prices",
    base: 2.4,
    spread: 2.5,
  },
  {
    code: "fp.cpi.totl.zg",
    name: "Inflation (CPI)",
    unit: "%",
    category: "growth-prices",
    base: 3.1,
    spread: 4,
  },
  {
    code: "sl.uem.totl.zs",
    name: "Unemployment",
    unit: "%",
    category: "labour-rates",
    base: 5.5,
    spread: 6,
  },
  {
    code: "policy.int.rate",
    name: "Interest Rate",
    unit: "%",
    category: "labour-rates",
    base: 4.5,
    spread: 3,
  },
  {
    code: "ne.rsb.gnfs.zs",
    name: "Balance of Trade",
    unit: "% of GDP",
    category: "external-fiscal",
    base: 0,
    spread: 4,
    signed: true,
  },
  {
    code: "bn.cab.xoka.gd.zs",
    name: "Current Account",
    unit: "% of GDP",
    category: "external-fiscal",
    base: 0,
    spread: 3,
    signed: true,
  },
  {
    code: "ggxwdg_ngdp",
    name: "Government Debt",
    unit: "% of GDP",
    category: "sovereign",
    base: 95,
    spread: 35,
  },
  {
    code: "bond.yield.10y",
    name: "10Y Bond Yield",
    unit: "%",
    category: "sovereign",
    base: 3.5,
    spread: 2,
  },
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function round(value, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

const snapshots = [];
const historical = {};

for (const country of COUNTRIES) {
  for (const indicator of INDICATORS) {
    const symbol = `${country.iso3}.${indicator.code}`;
    const seed = hash(symbol);
    const countryOffset = hash(country.iso3) % 100 / 50;
    const rawLast = indicator.base + countryOffset + (seed % 100) / 80;
    const signedFactor =
      indicator.signed && seed % 3 === 0 ? -1 : indicator.signed ? 0.6 : 1;
    const last = round(rawLast * signedFactor, 2);
    const previous = round(
      last + ((seed % 7) - 3) * 0.15,
      2,
    );

    snapshots.push({
      symbol,
      last,
      date: "2024-12-31T00:00:00",
      previous,
      previousDate: "2023-12-31T00:00:00",
      country: country.name,
      category: indicator.category,
      description: indicator.name,
      frequency: "Yearly",
      unit: indicator.unit,
      title: `${country.name} ${indicator.name}`,
      lastUpdate: "2025-01-15T00:00:00",
      consensus: null,
      forecast: null,
    });

    const points = [];
    for (let year = 2000; year <= 2024; year++) {
      const t = year - 2000;
      const wave = Math.sin((t + (seed % 12)) / 4) * indicator.spread * 0.35;
      const trend =
        (t - 12) * 0.04 * (indicator.code.includes("ggxwdg") ? 0.8 : 0.02);
      const raw = indicator.base + countryOffset + wave + trend;
      const value = round(raw * signedFactor, 2);
      points.push({
        symbol,
        date: `${year}-12-31T00:00:00`,
        value,
      });
    }
    historical[symbol] = points;
  }
}

const fixtures = { snapshots, historical };
const outPath = resolve(process.cwd(), "lib/mock/fixtures.json");
writeFileSync(outPath, JSON.stringify(fixtures, null, 2));
console.log(`Wrote ${snapshots.length} snapshots and ${Object.keys(historical).length} series to ${outPath}`);
