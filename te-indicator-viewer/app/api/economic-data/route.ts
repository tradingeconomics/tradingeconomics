import { NextResponse } from "next/server";
import { EconomicIndicator } from "../../../types/index";


const APIKEY = process.env.TE_API_KEY;


export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const country = searchParams.get("country");

  if(!country) {
    return NextResponse.json({error: "Contry is required"}, {status: 400});
  }

  try {
    const response = await fetch(
      `https://api.tradingeconomics.com/country/${country}?c=${APIKEY}`
    );
    if (!response.ok) {
      throw new Error("Trading Economics API is not responding");
    }

    const data: EconomicIndicator[] = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch economic data" },
      { status: 500 }
    );
  }
}