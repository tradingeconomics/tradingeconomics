import { NextResponse } from "next/server";
import { teFetch } from "@/lib/te";

type TEPoint = {
  Country: string;
  Category: string;
  DateTime: string;
  Value?: number;
  Close?: number;
  Frequency?: string;
  LastUpdate?: string;
};

function pickValue(p: TEPoint) {
  const v = typeof p.Value === "number" ? p.Value : p.Close;
  return typeof v === "number" ? v : null;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const a = url.searchParams.get("a");
  const b = url.searchParams.get("b");
  const indicator = url.searchParams.get("indicator");
  const start = url.searchParams.get("start") || undefined; // yyyy-mm-dd
  const end = url.searchParams.get("end") || undefined;

  if (!a || !b || !indicator) {
    return NextResponse.json({ error: "Missing a, b, or indicator" }, { status: 400 });
  }

  try {
    // Docs endpoint: /historical/country/{country}/indicator/{indicator}
    const [aSeries, bSeries] = await Promise.all([
      teFetch<TEPoint[]>(
        `/historical/country/${encodeURIComponent(a)}/indicator/${encodeURIComponent(indicator)}`,
        {},
        60
      ),
      teFetch<TEPoint[]>(
        `/historical/country/${encodeURIComponent(b)}/indicator/${encodeURIComponent(indicator)}`,
        {},
        60
      ),
    ]);

    const toMap = (series: TEPoint[]) => {
      const m = new Map<string, number>();
      for (const p of series) {
        const val = pickValue(p);
        if (val === null) continue;
        const d = new Date(p.DateTime);
        if (Number.isNaN(d.getTime())) continue;
        const key = d.toISOString().slice(0, 10);
        m.set(key, val);
      }
      return m;
    };

    const ma = toMap(aSeries);
    const mb = toMap(bSeries);

    const dates = Array.from(new Set([...ma.keys(), ...mb.keys()])).sort();
    const filteredDates = dates.filter((d) => {
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });

    const rows = filteredDates.map((d) => ({
      date: d,
      a: ma.get(d) ?? null,
      b: mb.get(d) ?? null,
    }));

    const meta = {
      indicator,
      aCountry: a,
      bCountry: b,
      aLastUpdate: aSeries?.[0]?.LastUpdate ?? null,
      bLastUpdate: bSeries?.[0]?.LastUpdate ?? null,
      aFrequency: aSeries?.[0]?.Frequency ?? null,
      bFrequency: bSeries?.[0]?.Frequency ?? null,
    };

    return NextResponse.json({ meta, rows });
  } catch (e: any) {
    const msg = e?.message || "Unknown error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
