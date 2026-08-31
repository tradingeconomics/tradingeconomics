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
  const start = url.searchParams.get("start") || "2016-01-01";
  const end = url.searchParams.get("end") || new Date().toISOString().slice(0, 10);

  if (!a || !b || !indicator) {
    return NextResponse.json({ error: "Missing a, b, or indicator" }, { status: 400 });
  }

  try {
    // Require TE_API_KEY to be set for TradingEconomics endpoints and give a helpful message
    if (!process.env.TE_API_KEY) {
      return NextResponse.json(
        { error: "TE_API_KEY is not set. Add TE_API_KEY to .env.local to call TradingEconomics endpoints." },
        { status: 400 }
      );
    }

    const countries = `${a},${b}`;

    const series = await teFetch<TEPoint[]>(
      `/historical/country/${encodeURIComponent(countries)}/indicator/${encodeURIComponent(
        indicator
      )}/${encodeURIComponent(start)}/${encodeURIComponent(end)}`,
      {},
      300
    );

    const ma = new Map<string, number>();
    const mb = new Map<string, number>();

    for (const p of series) {
      const val = pickValue(p);
      if (val === null) continue;
      const d = new Date(p.DateTime);
      if (Number.isNaN(d.getTime())) continue;
      const key = d.toISOString().slice(0, 10);
      if (p.Country === a) ma.set(key, val);
      if (p.Country === b) mb.set(key, val);
    }

    const dates = Array.from(new Set([...ma.keys(), ...mb.keys()])).sort();
    const rows = dates.map((d) => ({
      date: d,
      a: ma.get(d) ?? null,
      b: mb.get(d) ?? null,
    }));

    const meta = {
      indicator,
      aCountry: a,
      bCountry: b,
      aLastUpdate: series?.find((x) => x.Country === a)?.LastUpdate ?? null,
      bLastUpdate: series?.find((x) => x.Country === b)?.LastUpdate ?? null,
      aFrequency: series?.find((x) => x.Country === a)?.Frequency ?? null,
      bFrequency: series?.find((x) => x.Country === b)?.Frequency ?? null,
    };

    return NextResponse.json({ meta, rows });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Unknown error" }, { status: 502 });
  }
}
