import { policyRateFootnotes } from "@/lib/fred";

export const DATA_SOURCES_LINE = "Data: World Bank · IMF · FRED";

const POLICY_NOTE_ORDER = [
  "Euro area members shown at the ECB policy rate",
  "SONIA overnight rate (BoE policy rate series discontinued on FRED)",
  "Federal Funds Target Range (upper limit)",
] as const;

/** Single-line methodology note for policy interest rate series. */
export function policyRateFootnoteLine(iso3List: string[]): string | null {
  const notes = new Set(policyRateFootnotes(iso3List));
  const ordered = POLICY_NOTE_ORDER.filter((note) => notes.has(note));
  if (ordered.length === 0) return null;
  return `${ordered.join("; ")}.`;
}

export function g7FiscalTableFooter(iso3List: string[]) {
  return {
    note: policyRateFootnoteLine(iso3List),
    sources: DATA_SOURCES_LINE,
  };
}
