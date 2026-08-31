"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type CompareResponse = {
  meta: {
    indicator: string;
    aCountry: string;
    bCountry: string;
    aLastUpdate: string | null;
    bLastUpdate: string | null;
    aFrequency: string | null;
    bFrequency: string | null;
  };
  rows: Array<{ date: string; a: number | null; b: number | null }>;
};

const INDICATORS = [
  "Inflation Rate",
  "Unemployment Rate",
  "Interest Rate",
  "GDP Growth Rate",
  "GDP",
  "Balance of Trade",
  "Government Debt to GDP",
  "Current Account to GDP",
  "Exports",
  "Imports",
];

function clampNumber(x: unknown): number | null {
  if (typeof x !== "number" || Number.isNaN(x) || !Number.isFinite(x)) return null;
  return x;
}

function formatNumber(x: number | null, digits = 2) {
  if (x === null) return "—";
  // keep it simple; TE series units vary
  return x.toLocaleString(undefined, { maximumFractionDigits: digits });
}

function toCsv(rows: Array<{ date: string; a: number | null; b: number | null }>, aLabel: string, bLabel: string) {
  const header = ["date", aLabel, bLabel];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push([r.date, r.a ?? "", r.b ?? ""].join(","));
  }
  return lines.join("\n");
}

function downloadText(filename: string, text: string, mime = "text/plain") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function pearson(xs: number[], ys: number[]) {
  const n = Math.min(xs.length, ys.length);
  if (n < 3) return null;

  let sumX = 0,
    sumY = 0,
    sumXX = 0,
    sumYY = 0,
    sumXY = 0;

  for (let i = 0; i < n; i++) {
    const x = xs[i];
    const y = ys[i];
    sumX += x;
    sumY += y;
    sumXX += x * x;
    sumYY += y * y;
    sumXY += x * y;
  }

  const num = n * sumXY - sumX * sumY;
  const den = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
  if (den === 0) return null;
  return num / den;
}

function latestNonNull(rows: Array<{ date: string; v: number | null }>) {
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i].v !== null) return rows[i];
  }
  return null;
}

function minMax(values: Array<number | null>) {
  const nums = values.filter((v): v is number => typeof v === "number");
  if (nums.length === 0) return { min: null, max: null };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

export default function Page() {
  // Defaults (good demo)
  const defaultA = "New Zealand";
  const defaultB = "Sweden";
  const defaultIndicator = "Inflation Rate";

  const [countries, setCountries] = useState<string[]>([]);
  const [a, setA] = useState<string>(defaultA);
  const [b, setB] = useState<string>(defaultB);
  const [indicator, setIndicator] = useState<string>(defaultIndicator);

  const [start, setStart] = useState<string>(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1); // 1 year ago
    return d.toISOString().slice(0, 10);
  });
  const [end, setEnd] = useState<string>(() => new Date().toISOString().slice(0, 10));

  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CompareResponse | null>(null);

  // Load countries once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingCountries(true);
      setError(null);
      try {
        const res = await fetch("/api/countries");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load countries");
        if (!cancelled) setCountries(json.countries || []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load countries");
      } finally {
        if (!cancelled) setLoadingCountries(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sync state <-> URL (shareable link)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qa = params.get("a");
    const qb = params.get("b");
    const qi = params.get("indicator");
    const qs = params.get("start");
    const qe = params.get("end");
    if (qa) setA(qa);
    if (qb) setB(qb);
    if (qi) setIndicator(qi);
    if (qs) setStart(qs);
    if (qe) setEnd(qe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("a", a);
    params.set("b", b);
    params.set("indicator", indicator);
    params.set("start", start);
    params.set("end", end);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [a, b, indicator, start, end]);

  // Fetch comparison data when selection changes
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoadingData(true);
      setError(null);
      setData(null);
      try {
        if (!a || !b || !indicator) return;

        const url = `/api/compare?a=${encodeURIComponent(a)}&b=${encodeURIComponent(
          b
        )}&indicator=${encodeURIComponent(indicator)}&start=${encodeURIComponent(
          start
        )}&end=${encodeURIComponent(end)}`;

        const res = await fetch(url);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to fetch series");

        if (!cancelled) setData(json as CompareResponse);
      } catch (e: any) {
        if (!cancelled)
          setError(
            e?.message ||
              "Failed to fetch series. (Free tier may not have access — try another indicator.)"
          );
      } finally {
        if (!cancelled) setLoadingData(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [a, b, indicator, start, end]);

  const chartData = useMemo(() => {
    if (!data) return [];
    // Recharts wants numbers; keep nulls, it will break lines appropriately if we use connectNulls=false
    return data.rows.map((r) => ({
      date: r.date,
      a: clampNumber(r.a),
      b: clampNumber(r.b),
    }));
  }, [data]);

  const stats = useMemo(() => {
    if (!data) return null;

    const aVals = data.rows.map((r) => r.a);
    const bVals = data.rows.map((r) => r.b);

    const aLatest = latestNonNull(data.rows.map((r) => ({ date: r.date, v: r.a })));
    const bLatest = latestNonNull(data.rows.map((r) => ({ date: r.date, v: r.b })));

    const { min: aMin, max: aMax } = minMax(aVals);
    const { min: bMin, max: bMax } = minMax(bVals);

    // correlation on overlapping points
    const xs: number[] = [];
    const ys: number[] = [];
    for (const r of data.rows) {
      if (typeof r.a === "number" && typeof r.b === "number") {
        xs.push(r.a);
        ys.push(r.b);
      }
    }
    const corr = pearson(xs, ys);

    return {
      aLatest,
      bLatest,
      aMin,
      aMax,
      bMin,
      bMax,
      corr,
      overlapN: xs.length,
    };
  }, [data]);

  const canCompare = a && b && indicator && a !== b;

  const headerSubtitle = `${a} vs ${b} — ${indicator}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    } catch {
      alert("Could not copy link (browser permissions).");
    }
  };

  const downloadCsv = () => {
    if (!data) return;
    const csv = toCsv(data.rows, a, b);
    downloadText(
      `te_compare_${indicator.replaceAll(" ", "_")}_${a.replaceAll(" ", "_")}_vs_${b.replaceAll(
        " ",
        "_"
      )}.csv`,
      csv,
      "text/csv"
    );
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>Country Compare Dashboard</h1>
          <p style={{ margin: "6px 0 0", opacity: 0.75 }}>{headerSubtitle}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={copyLink} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid #ddd", background: "white", cursor: "pointer" }}>
            Copy link
          </button>
          <button
            onClick={downloadCsv}
            disabled={!data}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: data ? "white" : "#f5f5f5",
              cursor: data ? "pointer" : "not-allowed",
            }}
          >
            Download CSV
          </button>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 12 }}>
        <div style={{ gridColumn: "span 4", padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Country A</label>
          <select
            value={a}
            onChange={(e) => setA(e.target.value)}
            disabled={loadingCountries}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          >
            {countries.length === 0 ? (
              <option>{loadingCountries ? "Loading..." : "No countries loaded"}</option>
            ) : (
              countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))
            )}
          </select>
        </div>

        <div style={{ gridColumn: "span 4", padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Country B</label>
          <select
            value={b}
            onChange={(e) => setB(e.target.value)}
            disabled={loadingCountries}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          >
            {countries.length === 0 ? (
              <option>{loadingCountries ? "Loading..." : "No countries loaded"}</option>
            ) : (
              countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))
            )}
          </select>
        </div>

        <div style={{ gridColumn: "span 4", padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Indicator</label>
          <select
            value={indicator}
            onChange={(e) => setIndicator(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          >
            {INDICATORS.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div style={{ gridColumn: "span 6", padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Start date</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ gridColumn: "span 6", padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>End date</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>
      </div>

      {!canCompare && (
        <p style={{ marginTop: 12, color: "#b00" }}>
          Choose two different countries to compare.
        </p>
      )}

      {error && (
        <div style={{ marginTop: 14, padding: 12, border: "1px solid #f2c2c2", borderRadius: 14, background: "#fff5f5" }}>
          <strong>Error:</strong> {error}
          <div style={{ marginTop: 8, opacity: 0.8 }}>
            Tip: Free-tier accounts may not have access to every series. Try a different indicator.
          </div>
        </div>
      )}

      <div style={{ marginTop: 14, padding: 16, border: "1px solid #eee", borderRadius: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>Time series</h2>
          <div style={{ opacity: 0.7, fontSize: 13 }}>
            {data?.meta?.aFrequency || data?.meta?.bFrequency ? (
              <>Frequency: {data?.meta?.aFrequency || data?.meta?.bFrequency}</>
            ) : (
              <>Frequency: —</>
            )}
          </div>
        </div>

        <div style={{ width: "100%", height: 360, marginTop: 10 }}>
          {loadingData ? (
            <div style={{ padding: 12, opacity: 0.7 }}>Loading series…</div>
          ) : (
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={24} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="a" name={a} dot={false} />
                <Line type="monotone" dataKey="b" name={b} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 12 }}>
        <div style={{ gridColumn: "span 3", padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Latest ({a})</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            {formatNumber(stats?.aLatest?.v ?? null)}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {stats?.aLatest ? stats.aLatest.date : "—"}
          </div>
        </div>

        <div style={{ gridColumn: "span 3", padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Latest ({b})</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            {formatNumber(stats?.bLatest?.v ?? null)}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {stats?.bLatest ? stats.bLatest.date : "—"}
          </div>
        </div>

        <div style={{ gridColumn: "span 3", padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Range ({a})</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            {formatNumber(stats?.aMin ?? null)} → {formatNumber(stats?.aMax ?? null)}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Min → Max</div>
        </div>

        <div style={{ gridColumn: "span 3", padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Correlation</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            {stats?.corr === null || stats?.corr === undefined ? "—" : stats.corr.toFixed(3)}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            Overlap points: {stats?.overlapN ?? 0}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, padding: 12, border: "1px solid #eee", borderRadius: 14, opacity: 0.8, fontSize: 13 }}>
        <div>
          <strong>Notes:</strong> Data is fetched server-side via Next.js route handlers so your API key stays private.
        </div>
        <div style={{ marginTop: 6 }}>
          If a series fails to load, it may be unavailable on the free developer tier — try another indicator.
        </div>
      </div>
    </div>
  );
}
