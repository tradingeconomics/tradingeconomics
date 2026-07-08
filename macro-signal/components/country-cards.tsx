import { IndicatorCards } from "@/components/indicator-cards";
import { COUNTRIES, INDICATORS, symbolFor } from "@/lib/catalog";
import { getSnapshot } from "@/lib/te";

type CountryCardsProps = {
  country: string;
};

export async function CountryCards({ country }: CountryCardsProps) {
  const symbols = INDICATORS.map((indicator) =>
    symbolFor(country, indicator.code),
  );
  const snapshots = await getSnapshot(symbols);

  const cards = INDICATORS.map((indicator) => {
    const symbol = symbolFor(country, indicator.code);
    const snapshot = snapshots.find((row) => row.symbol === symbol);
    if (!snapshot) return null;
    return { snapshot, code: indicator.code };
  }).filter((card): card is NonNullable<typeof card> => card != null);

  return <IndicatorCards cards={cards} />;
}

export function countryLabel(iso3: string): string {
  return COUNTRIES.find((country) => country.iso3 === iso3)?.name ?? iso3;
}
