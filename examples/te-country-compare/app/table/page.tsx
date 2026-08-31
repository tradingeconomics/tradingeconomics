"use client";

import { useEffect, useMemo, useState } from "react";

export default function TablePage() {
  const [countries, setCountries] = useState<string[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/countries`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
        setCountries(json.countries || []);
      } catch (e: any) {
        setError(e?.message || "Failed to load countries");
        setCountries([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const [sortAsc, setSortAsc] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    let list = q ? countries.filter((c) => c.toLowerCase().includes(q)) : countries.slice();
    list.sort((a, b) => (a.localeCompare(b) * (sortAsc ? 1 : -1)));
    return list;
  }, [countries, filter, sortAsc]);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 34, margin: 0 }}>Table View</h1>
          <p style={{ color: "#555", marginTop: 8 }}>Country list with filtering, sorting, and quick detail pages.</p>
        </div>
        <div>
          <a href="/demo" style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, textDecoration: "none" }}>Demo Hub</a>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            placeholder="Filter countries..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: 10, width: "100%", borderRadius: 10, border: "1px solid #ddd" }}
          />
          <button onClick={() => setSortAsc((s) => !s)} style={{ padding: "10px 12px", borderRadius: 10 }}>{sortAsc ? "A → Z" : "Z → A"}</button>
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#777" }}>Showing {filtered.length} of {countries.length}</div>
        </div>

        <div style={{ marginTop: 12 }}>
          {loading && <div>Loading countries…</div>}
          {error && <div style={{ color: "#b3322c" }}>Error: {error}</div>}
          {!loading && !error && (
            <div style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ maxHeight: 520, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ position: "sticky", top: 0, background: "#fafafa", zIndex: 2, textAlign: "left", padding: 10, borderBottom: "1px solid #eee" }}>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => (
                      <tr
                        key={c}
                        tabIndex={0}
                        onFocus={() => setFocusedIndex(i)}
                        onBlur={() => setFocusedIndex((s) => (s === i ? null : s))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            window.location.href = `/table/${encodeURIComponent(c)}`;
                          }
                        }}
                        style={{
                          cursor: "pointer",
                          background: i % 2 === 0 ? "#fff" : "#fbfbfb",
                          outline: focusedIndex === i ? "3px solid rgba(17,17,17,0.08)" : "none",
                        }}
                      >
                        <td style={{ padding: 10, borderTop: "1px solid #f3f3f3" }}>
                          <a href={`/table/${encodeURIComponent(c)}`} style={{ textDecoration: "none", color: "inherit" }}>{c}</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}