import { NextRequest, NextResponse } from "next/server";

import { getHistorical, TeApiError } from "@/lib/te";

export async function GET(request: NextRequest) {
  const symbolsParam = request.nextUrl.searchParams.get("symbols");

  if (!symbolsParam) {
    return NextResponse.json(
      { error: "Missing required query parameter: symbols" },
      { status: 400 },
    );
  }

  const symbols = symbolsParam
    .split(",")
    .map((symbol) => symbol.trim())
    .filter(Boolean);

  if (symbols.length === 0) {
    return NextResponse.json(
      { error: "At least one symbol is required" },
      { status: 400 },
    );
  }

  try {
    const data = await getHistorical(symbols);
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof TeApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status >= 400 ? error.status : 502 },
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch historical series" },
      { status: 500 },
    );
  }
}
