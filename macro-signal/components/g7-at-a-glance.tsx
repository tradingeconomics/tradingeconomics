import { G7AtAGlanceTable } from "@/components/g7-at-a-glance-table";
import {
  COUNTRIES,
  G7_GLANCE_INDICATORS,
  G7_GLANCE_SECONDARY_INDICATORS,
  INDICATOR_CARD_ROWS,
  INDICATORS,
  symbolFor,
} from "@/lib/catalog";
import { g7FiscalTableFooter } from "@/lib/source-notes";
import { getSnapshot } from "@/lib/te";

type G7AtAGlanceProps = {
  selectedCountry: string;
};

function resolveGlanceIndicators(
  definitions: { code: string; columnLabel: string }[],
) {
  return definitions.map((glance) => {
    const indicator = INDICATORS.find((item) => item.code === glance.code);
    if (!indicator) {
      throw new Error(`Missing catalog indicator: ${glance.code}`);
    }
    return {
      code: glance.code,
      columnLabel: glance.columnLabel,
      unit: indicator.unit,
      valence: indicator.valence,
    };
  });
}

export async function G7AtAGlance({ selectedCountry }: G7AtAGlanceProps) {
  const headlineIndicators = resolveGlanceIndicators(G7_GLANCE_INDICATORS);
  const secondaryIndicators = resolveGlanceIndicators(
    G7_GLANCE_SECONDARY_INDICATORS,
  );
  const allIndicators = [...headlineIndicators, ...secondaryIndicators];

  const symbols = COUNTRIES.flatMap((country) =>
    allIndicators.map((indicator) => symbolFor(country.iso3, indicator.code)),
  );

  let snapshots;
  try {
    snapshots = await getSnapshot(symbols);
  } catch {
    return (
      <p className="text-sm text-muted-foreground">
        Unable to load G7 readings. Try again later.
      </p>
    );
  }

  const snapshotBySymbol = new Map(
    snapshots.map((snapshot) => [snapshot.symbol, snapshot]),
  );

  const rows = COUNTRIES.map((country) => ({
    iso3: country.iso3,
    name: country.name,
    cells: Object.fromEntries(
      allIndicators.map((indicator) => {
        const symbol = symbolFor(country.iso3, indicator.code);
        return [indicator.code, snapshotBySymbol.get(symbol)];
      }),
    ),
  }));

  const fiscalTableFooter = g7FiscalTableFooter(COUNTRIES.map((c) => c.iso3));

  return (
    <div className="space-y-8">
      <G7AtAGlanceTable
        rows={rows}
        indicators={headlineIndicators}
        selectedCountry={selectedCountry}
      />
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {INDICATOR_CARD_ROWS[1].label}
        </p>
        <G7AtAGlanceTable
          rows={rows}
          indicators={secondaryIndicators}
          selectedCountry={selectedCountry}
          tableFooter={fiscalTableFooter}
        />
      </div>
    </div>
  );
}
