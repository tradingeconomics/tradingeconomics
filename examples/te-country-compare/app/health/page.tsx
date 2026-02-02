"use client";

import { useEffect, useState } from "react";

type Check = {
  label: string;
  url: string;
};

type CheckResult = {
  ok: boolean;
  status: number;
  latencyMs: number | null;
  body?: string;
};

const CHECKS: Check[] = [
  { label: "/api/countries", url: "/api/countries" },
  { label: "/api/wbcompare?s1=usa.fr.inr.rinr&s2=aus.fr.inr.rinr", url: "/api/wbcompare?s1=usa.fr.inr.rinr&s2=aus.fr.inr.rinr" },
  { label: "/api/out", url: "/api/out" },
];

export default function Health() {
  const [results, setResults] = useState<Record<string, CheckResult | null>>({});
  const [running, setRunning] = useState(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<number | null>(null);

  useEffect(() => {
    runChecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function runChecks() {
    setRunning(true);
    setResults({});
    for (const c of CHECKS) {
      const start = performance.now();
      try {
        const res = await fetch(c.url);
        const latency = Math.round(performance.now() - start);
        let body = "";
        try {
          const json = await res.clone().json();
          body = JSON.stringify(json, null, 2);
        } catch {
          body = await res.text().catch(() => "");
        }
        setResults((s) => ({ ...s, [c.url]: { ok: res.ok, status: res.status, latencyMs: latency, body } }));
      } catch (e: any) {
        const latency = Math.round(performance.now() - start);
        setResults((s) => ({ ...s, [c.url]: { ok: false, status: 0, latencyMs: latency, body: String(e?.message || e) } }));
      }
    }
    setLastCheckedAt(Date.now());
    setRunning(false);
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 34, margin: 0 }}>API Health</h1>
          <p style={{ color: "#555", marginTop: 8 }}>Run quick checks against important endpoints and view responses.</p>
        </div>
        <div>
          <a href="/demo" style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, textDecoration: "none" }}>Demo Hub</a>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={runChecks} disabled={running} style={{ padding: "8px 12px", borderRadius: 8 }}>{running ? "Running…" : "Re-run checks"}</button>
          <div style={{ color: "#777" }}>Checks: {CHECKS.length}</div>
          <div style={{ color: "#777", marginLeft: 8 }}>{lastCheckedAt ? `Last checked at ${new Date(lastCheckedAt).toLocaleTimeString()}` : "Not checked yet"}</div>
          {running && <div style={{ marginLeft: 8, fontSize: 14, color: "#555" }}><span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 14, border: "2px solid #ccc", borderTopColor: "#111", animation: "spin 1s linear infinite" }} /></div>}
        </div>

        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .pill { padding: 6px 10px; border-radius: 999px; display: inline-block; font-weight: 700; }`}</style>

        <div style={{ marginTop: 12 }}> 
          {CHECKS.map((c) => {
            const r = results[c.url];
            return (
              <div key={c.url} style={{ padding: 12, border: "1px solid #eee", borderRadius: 8, marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{c.label}</div>
                    <div style={{ color: "#777", fontSize: 13 }}>{c.url}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {r ? (
                      <div>
                        <div style={{ fontWeight: 700 }}>
                          <span className="pill" style={{ background: r.ok ? "#e6f7ec" : "#fff0f0", color: r.ok ? "#0b7a07" : "#b3322c", border: "1px solid " + (r.ok ? "#d0f0dc" : "#f1c6c6") }}>{r.ok ? "OK" : "FAIL"}</span>
                        </div>
                        <div style={{ color: "#777", fontSize: 13 }}>{r.status} • {r.latencyMs ?? "—"} ms</div>
                      </div>
                    ) : (
                      <div style={{ color: "#777" }}>Checking…</div>
                    )}
                  </div>
                </div>

                {r && (
                  <details style={{ marginTop: 12, borderTop: "1px dashed #eee", paddingTop: 12 }}>
                    <summary style={{ cursor: "pointer", fontWeight: 600 }}>View response</summary>
                    <pre style={{ whiteSpace: "pre-wrap", maxHeight: 300, overflow: "auto", background: "#fafafa", padding: 12, borderRadius: 8 }}>{r.body}</pre>
                    {c.url === "/api/out" && <div style={{ marginTop: 8, color: "#777", fontSize: 13 }}><em>Note: <code>{`{ "files": [] }`}</code> is expected when <code>./out</code> is empty.</em></div>}
                  </details>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p style={{ marginTop: 20 }}>
        <a href="/demo">← Back to Demo Hub</a>
      </p>
    </main>
  );
}
