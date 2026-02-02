export default function DemoHub() {
  const links = [
    { href: "/", title: "Country Compare Dashboard (Indicators)", desc: "Your original UI (may 403 depending on access)." },
    { href: "/wb", title: "World Bank Compare", desc: "Compare two World Bank series codes with chart + CSV." },
    { href: "/cli", title: "CLI Tool (Option B)", desc: "Run te-compare to generate CSV/PNG/Markdown report." },
    { href: "/health", title: "API Health", desc: "Quick test endpoints: /api/countries, /api/wbcompare." },
    { href: "/table", title: "Table View (Option C)", desc: "Table + filtering page." },
  ];

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 40, marginBottom: 8 }}>TE Demo Hub</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        A small collection of features built for the TradingEconomics task.
      </p>

      <div style={{ display: "grid", gap: 14 }}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              display: "block",
              padding: 16,
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 600 }}>{l.title}</div>
            <div style={{ color: "#666", marginTop: 6 }}>{l.desc}</div>
            <div style={{ color: "#111", marginTop: 10 }}>Open →</div>
          </a>
        ))}
      </div>
    </main>
  );
}
