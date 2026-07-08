/**
 * Live coverage matrix for the frozen 8-indicator G7 catalog.
 * Usage: USE_MOCK=false FRED_API_KEY=... npm run verify-catalog
 */

const COUNTRIES = [
  { iso3: "can", name: "Canada", imf: "CAN" },
  { iso3: "fra", name: "France", imf: "FRA" },
  { iso3: "deu", name: "Germany", imf: "DEU" },
  { iso3: "ita", name: "Italy", imf: "ITA" },
  { iso3: "jpn", name: "Japan", imf: "JPN" },
  { iso3: "gbr", name: "United Kingdom", imf: "GBR" },
  { iso3: "usa", name: "United States", imf: "USA" },
];

const INDICATORS = [
  {
    code: "ny.gdp.mktp.kd.zg",
    name: "GDP Growth",
    source: "WB",
    wb: "NY.GDP.MKTP.KD.ZG",
  },
  {
    code: "fp.cpi.totl.zg",
    name: "Inflation (CPI)",
    source: "WB",
    wb: "FP.CPI.TOTL.ZG",
  },
  {
    code: "sl.uem.totl.zs",
    name: "Unemployment",
    source: "WB",
    wb: "SL.UEM.TOTL.ZS",
  },
  {
    code: "policy.int.rate",
    name: "Interest Rate",
    source: "FRED",
    fredType: "policy",
  },
  {
    code: "ne.rsb.gnfs.zs",
    name: "Balance of Trade",
    source: "WB",
    wb: "NE.RSB.GNFS.ZS",
  },
  {
    code: "bn.cab.xoka.gd.zs",
    name: "Current Account",
    source: "WB",
    wb: "BN.CAB.XOKA.GD.ZS",
  },
  {
    code: "ggxwdg_ngdp",
    name: "Government Debt",
    source: "IMF",
    imf: "GGXWDG_NGDP",
  },
  {
    code: "bond.yield.10y",
    name: "10Y Bond Yield",
    source: "FRED",
    fredType: "bond",
  },
];

const FRED_POLICY_SERIES = {
  usa: "DFEDTARU",
  can: "IRSTCI01CAM156N",
  jpn: "IRSTCI01JPM156N",
  gbr: "IUDSOIA",
  deu: "ECBDFR",
  fra: "ECBDFR",
  ita: "ECBDFR",
};

const FRED_BOND_SERIES = {
  usa: "IRLTLT01USM156N",
  can: "IRLTLT01CAM156N",
  jpn: "IRLTLT01JPM156N",
  deu: "IRLTLT01DEM156N",
  fra: "IRLTLT01FRM156N",
  gbr: "IRLTLT01GBM156N",
  ita: "IRLTLT01ITM156N",
};

const IMF_WEO_MAX_YEAR = 2025;
const G7_BATCH = COUNTRIES.map((country) => country.iso3).join(";");
const G7_IMF = COUNTRIES.map((country) => country.imf).join("/");
const CURRENT_YEAR = new Date().getFullYear();
const DATE_RANGE = `2000:${CURRENT_YEAR}`;
const FRED_KEY = process.env.FRED_API_KEY;
const STALE_MONTHS = 12;
const FRESH_MONTHS = 6;

function formatObsMonth(dateStr) {
  const day = dateStr.split("T")[0];
  const date = new Date(`${day}T00:00:00`);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function monthsSinceObservation(dateStr) {
  const day = dateStr.split("T")[0];
  const observed = new Date(`${day}T00:00:00`);
  const now = new Date();
  return (
    (now.getFullYear() - observed.getFullYear()) * 12 +
    (now.getMonth() - observed.getMonth())
  );
}

function isImfWeoYear(year) {
  const parsed = Number(year);
  return !Number.isNaN(parsed) && parsed <= IMF_WEO_MAX_YEAR;
}

async function fetchWbIndicator(wbCode) {
  const params = new URLSearchParams({
    format: "json",
    per_page: "200",
    date: DATE_RANGE,
  });
  const url = `https://api.worldbank.org/v2/country/${G7_BATCH}/indicator/${wbCode}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    return { status: "error", detail: `HTTP ${response.status}` };
  }

  const payload = await response.json();
  const rows = Array.isArray(payload?.[1]) ? payload[1] : [];

  const latestByCountry = new Map();
  for (const row of rows) {
    if (row.value == null || !row.countryiso3code || !row.date) continue;
    const iso = row.countryiso3code.toLowerCase();
    const current = latestByCountry.get(iso);
    if (!current || Number(row.date) > Number(current.date)) {
      latestByCountry.set(iso, { date: row.date, value: row.value });
    }
  }

  return { status: "ok", latestByCountry };
}

async function fetchImfIndicator(imfCode) {
  const url = `https://www.imf.org/external/datamapper/api/v1/${imfCode}/${G7_IMF}`;
  const response = await fetch(url);
  if (!response.ok) {
    return { status: "error", detail: `HTTP ${response.status}` };
  }

  const payload = await response.json();
  const values = payload?.values?.[imfCode] ?? {};
  const latestByCountry = new Map();

  for (const country of COUNTRIES) {
    const series = values[country.imf];
    if (!series) continue;
    const years = Object.keys(series)
      .filter(isImfWeoYear)
      .sort((a, b) => Number(b) - Number(a));
    if (years.length === 0) continue;
    const year = years[0];
    latestByCountry.set(country.iso3, { date: year, value: series[year] });
  }

  return { status: "ok", latestByCountry };
}

function downsampleFredAnnual(observations) {
  const valid = observations.filter((row) => row.value !== ".");
  const byYear = new Map();

  for (const obs of valid) {
    const date = new Date(`${obs.date}T00:00:00`);
    const year = date.getFullYear();
    const month = date.getMonth();
    const existing = byYear.get(year);

    if (!existing) {
      byYear.set(year, obs);
      continue;
    }

    const existingMonth = new Date(`${existing.date}T00:00:00`).getMonth();
    const existingIsDec = existingMonth === 11;
    const obsIsDec = month === 11;

    if (obsIsDec && !existingIsDec) {
      byYear.set(year, obs);
      continue;
    }

    if (obsIsDec === existingIsDec && obs.date > existing.date) {
      byYear.set(year, obs);
    }
  }

  const years = [...byYear.keys()].sort((a, b) => b - a);
  if (years.length === 0) return null;
  const obs = byYear.get(years[0]);
  return {
    date: obs.date,
    value: Number.parseFloat(obs.value),
  };
}

function latestFredObservation(observations) {
  const valid = observations.filter((row) => row.value !== ".");
  if (valid.length === 0) return null;
  return valid[valid.length - 1];
}

async function fetchFredSeries(seriesId) {
  if (!FRED_KEY) {
    return { status: "error", detail: "FRED_API_KEY missing" };
  }

  const params = new URLSearchParams({
    series_id: seriesId,
    api_key: FRED_KEY,
    file_type: "json",
    observation_start: "2000-01-01",
  });
  const url = `https://api.stlouisfed.org/fred/series/observations?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    return { status: "error", detail: `HTTP ${response.status}` };
  }

  const payload = await response.json();
  if (payload.error_message) {
    return { status: "error", detail: payload.error_message };
  }

  const observations = payload.observations ?? [];
  const latestRaw = latestFredObservation(observations);
  const latest = downsampleFredAnnual(observations);

  if (!latest || !latestRaw) {
    return { status: "empty", detail: "no observations" };
  }

  const monthsSince = monthsSinceObservation(latestRaw.date);
  const stale = monthsSince > STALE_MONTHS;

  return {
    status: "ok",
    latest,
    observationDate: latestRaw.date,
    monthsSince,
    stale,
  };
}

const results = [];
const fredFreshness = [];
const imfLatestYears = [];

for (const indicator of INDICATORS) {
  if (indicator.source === "WB") {
    const fetched = await fetchWbIndicator(indicator.wb);
    if (fetched.status !== "ok") {
      for (const country of COUNTRIES) {
        results.push({
          symbol: `${country.iso3}.${indicator.code}`,
          country: country.name,
          indicator: indicator.name,
          source: indicator.source,
          status: fetched.status,
          detail: fetched.detail,
        });
      }
      continue;
    }

    for (const country of COUNTRIES) {
      const latest = fetched.latestByCountry.get(country.iso3);
      results.push({
        symbol: `${country.iso3}.${indicator.code}`,
        country: country.name,
        indicator: indicator.name,
        source: indicator.source,
        status: latest ? "live" : "empty",
        detail: latest ? `last=${latest.value} (${latest.date})` : "no value",
      });
    }
    continue;
  }

  if (indicator.source === "IMF") {
    const fetched = await fetchImfIndicator(indicator.imf);
    if (fetched.status !== "ok") {
      for (const country of COUNTRIES) {
        results.push({
          symbol: `${country.iso3}.${indicator.code}`,
          country: country.name,
          indicator: indicator.name,
          source: indicator.source,
          status: fetched.status,
          detail: fetched.detail,
        });
      }
      continue;
    }

    for (const country of COUNTRIES) {
      const latest = fetched.latestByCountry.get(country.iso3);
      if (latest) {
        imfLatestYears.push({
          symbol: `${country.iso3}.${indicator.code}`,
          country: country.name,
          year: Number(latest.date),
          value: latest.value,
        });
      }
      results.push({
        symbol: `${country.iso3}.${indicator.code}`,
        country: country.name,
        indicator: indicator.name,
        source: indicator.source,
        status: latest ? "live" : "empty",
        detail: latest ? `last=${latest.value} (${latest.date})` : "no value",
      });
    }
    continue;
  }

  if (indicator.source === "FRED") {
    const seriesMap =
      indicator.fredType === "bond" ? FRED_BOND_SERIES : FRED_POLICY_SERIES;

    for (const country of COUNTRIES) {
      const seriesId = seriesMap[country.iso3];
      const fetched = await fetchFredSeries(seriesId);
      const symbol = `${country.iso3}.${indicator.code}`;

      if (fetched.status === "ok") {
        fredFreshness.push({
          symbol,
          seriesId,
          indicator: indicator.name,
          observationDate: fetched.observationDate,
          monthsSince: fetched.monthsSince,
          stale: fetched.stale,
        });
      }

      results.push({
        symbol,
        country: country.name,
        indicator: indicator.name,
        source: `${indicator.source}:${seriesId}`,
        status: fetched.status === "ok" ? "live" : fetched.status,
        detail:
          fetched.status === "ok"
            ? `last=${fetched.latest.value} (${formatObsMonth(fetched.latest.date)}) obs=${fetched.observationDate}`
            : fetched.detail,
      });
    }
  }
}

const colSymbol = 30;
const colCountry = 18;
const colIndicator = 22;
const colSource = 22;
const colStatus = 8;
const colDetail = 28;

console.log(
  "Symbol".padEnd(colSymbol) +
    "Country".padEnd(colCountry) +
    "Indicator".padEnd(colIndicator) +
    "Source".padEnd(colSource) +
    "Status".padEnd(colStatus) +
    "Detail",
);
console.log("-".repeat(colSymbol + colCountry + colIndicator + colSource + colStatus + colDetail));

for (const row of results) {
  console.log(
    row.symbol.padEnd(colSymbol) +
      row.country.padEnd(colCountry) +
      row.indicator.padEnd(colIndicator) +
      row.source.padEnd(colSource) +
      row.status.padEnd(colStatus) +
      row.detail,
  );
}

const live = results.filter((r) => r.status === "live").length;
const empty = results.filter((r) => r.status === "empty").length;
const errors = results.filter((r) => r.status === "error").length;

console.log("");
console.log(
  `Summary: ${live} live, ${empty} empty, ${errors} error (${results.length} total) — target 56/56 live`,
);

if (!FRED_KEY) {
  console.log("");
  console.log("Warning: FRED_API_KEY not set — FRED cells will fail verification.");
}

const staleFred = fredFreshness.filter((row) => row.stale);
console.log("");
console.log("FRED last-observation dates:");
for (const row of fredFreshness) {
  const flag = row.stale ? "STALE" : "ok";
  console.log(
    `  ${row.symbol} (${row.seriesId}) — ${row.observationDate} (${row.monthsSince}mo) [${flag}]`,
  );
}

if (staleFred.length > 0) {
  console.log("");
  console.log(`FRED stale report (>${STALE_MONTHS} months — consider swapping sources):`);
  for (const row of staleFred) {
    console.log(
      `  ${row.symbol} (${row.seriesId}) — last obs ${row.observationDate} (${row.monthsSince} months ago)`,
    );
  }
} else if (fredFreshness.length > 0) {
  console.log("");
  console.log(`FRED freshness: all ${fredFreshness.length} series within ${STALE_MONTHS} months.`);
}

const imfOverMax = imfLatestYears.filter((row) => row.year > IMF_WEO_MAX_YEAR);
console.log("");
console.log(`IMF WEO latest year per country (must be ≤ ${IMF_WEO_MAX_YEAR}):`);
for (const row of imfLatestYears) {
  const flag = row.year > IMF_WEO_MAX_YEAR ? "OVER" : "ok";
  console.log(`  ${row.symbol} — ${row.value} (${row.year}) [${flag}]`);
}
if (imfOverMax.length > 0) {
  console.log("");
  console.log(`IMF year clamp failed for ${imfOverMax.length} series.`);
} else if (imfLatestYears.length > 0) {
  console.log("");
  console.log(`IMF year clamp: all ${imfLatestYears.length} series ≤ ${IMF_WEO_MAX_YEAR}.`);
}

const fredTooOld = fredFreshness.filter((row) => row.monthsSince > FRESH_MONTHS);
if (fredTooOld.length > 0) {
  console.log("");
  console.log(`FRED freshness warning (>${FRESH_MONTHS} months):`);
  for (const row of fredTooOld) {
    console.log(
      `  ${row.symbol} (${row.seriesId}) — last obs ${row.observationDate} (${row.monthsSince} months ago)`,
    );
  }
}

console.log("");
console.log("FRED policy-rate fallbacks:");
console.log("  USA: IRSTCB01USM156N missing → DFEDTARU");
console.log("  CAN: IRSTCB01CAM156N discontinued → IRSTCI01CAM156N (BoC call-money rate)");
console.log("  JPN: IRSTCB01JPM156N discontinued → IRSTCI01JPM156N (BoJ overnight call rate)");
console.log("  GBR: IRSTCB01GBM156N missing → IUDSOIA (SONIA)");
console.log("  DEU/FRA/ITA: IRSTCB01* missing → ECBDFR");
