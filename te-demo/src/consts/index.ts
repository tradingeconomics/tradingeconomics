export const AVAILABLECOUNTRIES = [
  "Sweden",
  "Mexico",
  "New Zealand",
  "Thailand",
] as const;

export type AvailableCountriesTypes = (typeof AVAILABLECOUNTRIES)[number];
