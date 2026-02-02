import { NextResponse } from "next/server";
import { teFetch } from "@/lib/te";

type WBPoint = { symbol: string; date: string; value: number | null };

function toISODate(d: string) {
  const iso = new Date(d).toISOString();
  return iso.slice(0, 10);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const s1 = searchParams.get("s1")?.trim();
    const s2 = searchParams.get("s2")?.trim();
    const start = searchParams.get("start")?.trim(); // optional YYYY-MM-DD
    const end = searchParams.get("end")?.trim(); // optional YYYY-MM-DD

    if (!s1 || !s2) {
      return NextResponse.json({ error: "Missing s1 or s2" }, { status: 400 });
    }

    const path = `/worldbank/historical?s=${encodeURIComponent(`${s1},${s2}`)}`;
    // Pass an empty params object and set revalidation seconds as third argument
    const data = await teFetch<WBPoint[]>(path, {}, 3600);

    const mapA = new Map<string, number | null>();
    const mapB = new Map<string, number | null>();

    for (const p of data) {
      const key = toISODate(p.date);
      if (p.symbol?.toLowerCase() === s1.toLowerCase()) mapA.set(key, p.value ?? null);
      if (p.symbol?.toLowerCase() === s2.toLowerCase()) mapB.set(key, p.value ?? null);
    }

    const allDates = Array.from(new Set([...mapA.keys(), ...mapB.keys()])).sort();

    const filteredDates = allDates.filter((d) => {
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });

    const rows = filteredDates.map((date) => ({
      date,
      aValue: mapA.get(date) ?? null,
      bValue: mapB.get(date) ?? null,
    }));

    return NextResponse.json({ seriesA: s1, seriesB: s2, rows });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 502 });
  }
}
