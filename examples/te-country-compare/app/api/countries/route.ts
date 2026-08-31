import { NextResponse } from "next/server";
import { teFetch } from "@/lib/te";

type CountryRow = {
  Name?: string;
  Country?: string;
  ISO3?: string;
};

export async function GET() {
  try {
    if (!process.env.TE_API_KEY) {
      return NextResponse.json(
        { error: "TE_API_KEY is not set. Add TE_API_KEY to .env.local to call TradingEconomics endpoints." },
        { status: 400 }
      );
    }

    // Docs: /country returns list of countries
    const rows = await teFetch<CountryRow[]>("/country", {}, 60 * 60);
    const countries = rows
      .map((r) => r.Name || r.Country)
      .filter((x): x is string => Boolean(x))
      .sort((a, b) => a.localeCompare(b));
    return NextResponse.json({ countries });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to load countries" }, { status: 502 });
  }
}
