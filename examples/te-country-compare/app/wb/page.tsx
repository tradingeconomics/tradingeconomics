"use client";

import { useMemo, useState } from "react";

type Row = { date: string; aValue: number | null; bValue: number | null };

export default function WBPage() {
  const [seriesA, setSeriesA] = useState("usa.fr.inr.rinr");
  const [seriesB, setSeriesB] = useState("aus.fr.inr.rinr");
  const [start, setStart] = useState("2010-01-01");
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));

  const TEMPLATES: { label: string; pattern: string }[] = [
    { label: "Inflation (CPI)", pattern: "{A}.fr.inr.rinr" },
    { label: "GDP (current US$)", pattern: "{A}.ny.gdp.mktp.cd" },
    { label: "Unemployment (%)", pattern: "{A}.sl.uem.r0" },
    { label: "GDP per capita", pattern: "{A}.ny.gdp.pcap.cd" },
    { label: "Exports", pattern: "{A}.tx.export" },
  ];

  function getPrefix(s: string) {
    const p = s.split(".")[0];
    return p || "usa";
  }

  function applyTemplate(pattern: string) {
    const aPref = getPrefix(seriesA);
    const bPref = getPrefix(seriesB);
    setSeriesA(pattern.replace(/{A}/g, aPref).replace(/{B}/g, aPref));
    setSeriesB(pattern.replace(/{A}/g, bPref).replace(/{B}/g, bPref));
  }

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const last = useMemo(() => {
    for (let i = rows.length - 1; i >= 0; i--) {
      const r = rows[i];
      if (r.aValue !== null || r.bValue !== null) return r;
    }
    return null;
  }, [rows]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({ s1: seriesA, s2: seriesB, start, end });
      const res = await fetch(`/api/wbcompare?${qs.toString()}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      setRows(json.rows || []);
    } catch (e: any) {
      setRows([]);
      setError(e?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  function downloadCSV() {
    const header = "date,seriesA,seriesB\n";
    const body = rows
      .map((r) => `${r.date},${r.aValue ?? ""},${r.bValue ?? ""}`)
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wb_${seriesA}_vs_${seriesB}_${start}_to_${end}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 34, margin: 0 }}>World Bank Compare</h1>
          <p style={{ color: "#555", marginTop: 8 }}>
            Compares two World Bank series codes via <code>/api/wbcompare</code>.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/demo" style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, textDecoration: "none" }}>
            Demo Hub
          </a>
          <button
            onClick={downloadCSV}
            disabled={!rows.length}
            style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, background: "white" }}
          >
            Download CSV
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, marginTop: 18, alignItems: "end" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontWeight: 600 }}>Series A (WB code)</span>
            <input value={seriesA} onChange={(e) => setSeriesA(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontWeight: 600 }}>Series B (WB code)</span>
            <input value={seriesB} onChange={(e) => setSeriesB(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontWeight: 600 }}>Start</span>
            <input type="date" value={start} onChange={(e) => setStart(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontWeight: 600 }}>End</span>
            <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
          </label>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ display: "block", fontWeight: 600 }}>Templates</label>
          <select onChange={(e) => applyTemplate(e.target.value)} style={{ padding: 8, borderRadius: 8, border: "1px solid #ddd" }}>
            <option value="">— Choose a template —</option>
            {TEMPLATES.map((t) => (
              <option key={t.label} value={t.pattern}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button
          onClick={load}
          disabled={loading}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", background: "#111", color: "white" }}
        >
          {loading ? "Loading..." : "Compare"}
        </button>
        <code style={{ alignSelf: "center", color: "#555" }}>
          /api/wbcompare?s1={encodeURIComponent(seriesA)}&amp;s2={encodeURIComponent(seriesB)}
        </code>
      </div>

      {error && (
        <div style={{ marginTop: 14, padding: 12, border: "1px solid #f2b8b5", background: "#fff5f5", borderRadius: 10 }}>
          <b>Error:</b> {error}
        </div>
      )}

      {last && (
        <div style={{ marginTop: 14, padding: 12, border: "1px solid #eee", background: "#fafafa", borderRadius: 10 }}>
          <b>Latest:</b> {last.date} — A: {last.aValue ?? "n/a"} | B: {last.bValue ?? "n/a"}
        </div>
      )}

      <div style={{ marginTop: 16, overflowX: "auto", border: "1px solid #eee", borderRadius: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              <th style={{ textAlign: "left", padding: 10, borderBottom: "1px solid #eee" }}>Date</th>
              <th style={{ textAlign: "right", padding: 10, borderBottom: "1px solid #eee" }}>{seriesA}</th>
              <th style={{ textAlign: "right", padding: 10, borderBottom: "1px solid #eee" }}>{seriesB}</th>
            </tr>
          </thead>
          <tbody>
            {rows.slice(-200).map((r) => (
              <tr key={r.date}>
                <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3" }}>{r.date}</td>
                <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3", textAlign: "right" }}>{r.aValue ?? ""}</td>
                <td style={{ padding: 10, borderBottom: "1px solid #f3f3f3", textAlign: "right" }}>{r.bValue ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ color: "#777", marginTop: 10 }}>
        Showing last 200 rows (to keep rendering fast).
      </p>
    </main>
  );
}
