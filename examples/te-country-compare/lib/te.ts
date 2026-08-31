const TE_BASE = "https://api.tradingeconomics.com";

export class TEError extends Error {
  status: number;
  body?: string;

  constructor(message: string, status: number, body?: string) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

function getApiKey() {
  // Return API key if present; don't throw so endpoints can surface clearer errors
  const key = process.env.TE_API_KEY;
  return key || undefined;
}

export async function teFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
  revalidateSeconds = 60
): Promise<T> {
  const apiKey = getApiKey();

  const url = new URL(`${TE_BASE}${path}`);
  url.searchParams.set("f", "json");
  if (apiKey) {
    url.searchParams.set("c", apiKey);
  }

  for (const [k, v] of Object.entries(params)) {
    if (v === undefined) continue;
    url.searchParams.set(k, String(v));
  }

  const res = await fetch(url.toString(), { next: { revalidate: revalidateSeconds } });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    // Include body in the error to help debugging (e.g. 403 messages from TradingEconomics)
    throw new TEError(`TradingEconomics API error (${res.status})${body ? `: ${body}` : ""}`, res.status, body);
  }

  return (await res.json()) as T;
}
