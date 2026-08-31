"use client";

import { useEffect, useMemo, useState } from "react";

export default function CLIPage() {
  const [country1, setCountry1] = useState("United States");
  const [country2, setCountry2] = useState("Australia");
  const [indicator, setIndicator] = useState("Inflation Rate");
  const [start, setStart] = useState("2016-01-01");
  const [end, setEnd] = useState(new Date().toISOString().slice(0, 10));

  const [files, setFiles] = useState<{ name: string; bytes: number; updatedAt: string }[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ name: string; type: "csv" | "md" | "png"; content: any } | null>(null);

  const command = useMemo(() => {
    const parts = [
      "npm run te-compare --",
      `--country1 "${country1.replace(/"/g, "\"")}"`,
      `--country2 "${country2.replace(/"/g, "\"")}"`,
      `--indicator "${indicator.replace(/"/g, "\"")}"`,
      `--start ${start}`,
      `--end ${end}`,
    ];
    return parts.join(" ");
  }, [country1, country2, indicator, start, end]);

  useEffect(() => {
    refreshFiles();
  }, []);

  async function refreshFiles() {
    setLoadingFiles(true);
    setFileError(null);
    setFiles([]);
    try {
      const res = await fetch("/api/out");
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      setFiles(json.files || []);
    } catch (e: any) {
      setFileError(e?.message || "Failed to list out files");
    } finally {
      setLoadingFiles(false);
    }
  }

  async function previewFile(name: string) {
    setPreview(null);
    try {
      const encoded = encodeURIComponent(name);
      const res = await fetch(`/api/out/${encoded}`);
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || `HTTP ${res.status}`);
      }

      const ct = res.headers.get("content-type") || "";
      if (ct.includes("text/csv")) {
        const txt = await res.text();
        const rows = txt.split(/\r?\n/).filter(Boolean).slice(0, 200);
        const parsed = rows.map((r) => r.split(","));
        setPreview({ name, type: "csv", content: parsed });
      } else if (ct.includes("markdown") || name.endsWith(".md")) {
        const txt = await res.text();
        setPreview({ name, type: "md", content: txt });
      } else if (ct.includes("image/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPreview({ name, type: "png", content: url });
      } else {
        const txt = await res.text();
        setPreview({ name, type: "md", content: txt });
      }
    } catch (e: any) {
      setFileError(e?.message || "Failed to preview file");
    }
  }

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed; select and copy manually.");
    }
  }

  function downloadFile(name: string) {
    const encoded = encodeURIComponent(name);
    fetch(`/api/out/${encoded}`)
      .then(async (res) => {
        if (!res.ok) {
          const j = await res.json().catch(() => null);
          throw new Error(j?.error || `HTTP ${res.status}`);
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      })
      .catch((e) => setFileError(String(e?.message || e)));
  }

  return (
    <main style={{ maxWidth: 1000, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 34, margin: 0 }}>Report Generator</h1>
          <p style={{ color: "#555", marginTop: 8 }}>Build and preview the CLI command and outputs written to <code>./out</code>.</p>
        </div>
        <div>
          <a href="/demo" style={{ padding: "10px 14px", border: "1px solid #ddd", borderRadius: 10, textDecoration: "none" }}>Demo Hub</a>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 18, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 560px", minWidth: 280 }}>
          <section style={{ padding: 16, borderRadius: 12, border: "1px solid #eee" }}>
            <h3 style={{ marginTop: 0 }}>Inputs</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ fontWeight: 600 }}>Country 1</span>
                <input value={country1} onChange={(e) => setCountry1(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
              </label>
              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ fontWeight: 600 }}>Country 2</span>
                <input value={country2} onChange={(e) => setCountry2(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
              </label>
              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ fontWeight: 600 }}>Indicator</span>
                <input value={indicator} onChange={(e) => setIndicator(e.target.value)} style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }} />
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

            <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ flex: 1, background: "#111", color: "white", padding: 12, borderRadius: 8, overflowX: "auto", fontFamily: "monospace" }}>{command}</div>
              <button onClick={copyCommand} style={{ padding: "8px 12px", borderRadius: 8 }}>Copy</button>
            </div>

            <div style={{ marginTop: 12 }}>
              <h4 style={{ margin: 0 }}>Run checklist</h4>
              <ol style={{ marginTop: 8 }}>
                <li>Start the dev server: <code>npm run dev</code></li>
                <li>Run the command shown above (in a second terminal)</li>
                <li>Refresh the Outputs panel to see newly-created files</li>
              </ol>
            </div>
          </section>
        </div>

        <div style={{ width: 380, minWidth: 240 }}>
          <section style={{ padding: 16, borderRadius: 12, border: "1px solid #eee" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>Outputs <small style={{ color: "#777" }}>/out</small></h3>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={refreshFiles} style={{ padding: "8px 12px", borderRadius: 8 }} disabled={loadingFiles}>Refresh</button>
              </div>
            </div>

            {fileError && <div style={{ marginTop: 12, color: "#b3322c" }}>Error: {fileError}</div>}

            <div style={{ marginTop: 12, border: "1px solid #fafafa", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ padding: 12, textAlign: "center", color: "#777" }}>
                {loadingFiles ? "Loading…" : files.length === 0 ? (
                  <div>
                    <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="20" width="100" height="48" rx="8" stroke="#eee" strokeWidth="2" fill="#fafafa" />
                      <path d="M20 32 H100" stroke="#eee" strokeWidth="1.5" />
                      <circle cx="40" cy="52" r="5" fill="#eee" />
                      <circle cx="60" cy="52" r="5" fill="#eee" />
                      <circle cx="80" cy="52" r="5" fill="#eee" />
                    </svg>
                    <div style={{ marginTop: 8 }}>No output files yet. Run the command to generate CSV, PNG, and Markdown.</div>
                    <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}><em>Note: {`{ "files": [] }`} is expected when <code>./out</code> is empty.</em></div>
                  </div>
                ) : (
                  files.map((f) => (
                    <div key={f.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10, borderTop: "1px solid #f3f3f3" }}>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180 }} onClick={() => previewFile(f.name)}>
                        {f.name}
                        <div style={{ color: "#999", fontSize: 12 }}>{(f.bytes / 1024).toFixed(1)} KB • {new Date(f.updatedAt).toLocaleString()}</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => previewFile(f.name)} style={{ padding: "6px 8px", borderRadius: 8 }}>Preview</button>
                        <a
                          href={`/api/out/${encodeURIComponent(f.name)}?download=1`}
                          download={f.name}
                          style={{ padding: "6px 8px", borderRadius: 8, display: "inline-block", textDecoration: "none", border: "1px solid #ddd", background: "white", color: "inherit" }}
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Preview</div>
              {!preview && <div style={{ color: "#777" }}>Select a file to preview</div>}
              {preview?.type === "csv" && (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <tbody>
                      {preview.content.slice(0, 200).map((row: string[], i: number) => (
                        <tr key={i} style={{ borderTop: "1px solid #f3f3f3" }}>
                          {row.map((c: string, j: number) => (
                            <td key={j} style={{ padding: 8, borderRight: "1px solid #f3f3f3" }}>{c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {preview?.type === "md" && (
                <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, color: "#222" }}>{preview.content}</div>
              )}
              {preview?.type === "png" && (
                <div style={{ textAlign: "center" }}>
                  <img src={preview.content} alt={preview.name} style={{ maxWidth: "100%", height: "auto" }} />
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <p style={{ marginTop: 20 }}>
        <a href="/demo">← Back to Demo Hub</a>
      </p>
    </main>
  );
}
