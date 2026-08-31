import Link from "next/link";

export default function CountryPage({ params }: { params: { country: string } }) {
  const country = decodeURIComponent(params.country);

  // Example World Bank series codes (these are simple examples and not country-specific codes)
  const samples = [
    { label: "Inflation (CPI)", code: "usa.fr.inr.rinr" },
    { label: "GDP per capita", code: "usa.ngdp.pc" },
    { label: "Unemployment rate", code: "usa.sl.uem.r0" },
  ];

  const quickLinks = samples.map((s) => ({ label: s.label, href: `/wb?s1=${encodeURIComponent(s.code)}&s2=${encodeURIComponent(s.code)}` }));

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 34, margin: 0 }}>{country}</h1>
          <p style={{ color: "#555", marginTop: 8 }}>Actions and quick links for the selected country.</p>
        </div>
        <div>
          <Link href="/table" style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8, textDecoration: "none" }}>← Back</Link>
        </div>
      </div>

      <section style={{ marginTop: 20, padding: 16, border: "1px solid #eee", borderRadius: 8 }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Quick actions</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {quickLinks.map((q) => (
            <a key={q.href} href={q.href} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", textDecoration: "none" }}>{q.label}</a>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 16, padding: 12, border: "1px solid #fafafa", borderRadius: 8, background: "#fff" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Debug</div>
        <div style={{ color: "#333" }}>Country (raw): <code>{country}</code></div>
        <div style={{ marginTop: 6, color: "#333" }}>Example link: <a href={`/wb?s1=usa.fr.inr.rinr&s2=aus.fr.inr.rinr`}>/wb?s1=usa.fr.inr.rinr&s2=aus.fr.inr.rinr</a></div>
      </section>

      <p style={{ marginTop: 20 }}>
        <a href="/table">← Back to Table</a>
      </p>
    </main>
  );
}
