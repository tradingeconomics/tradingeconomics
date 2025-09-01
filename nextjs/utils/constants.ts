enum SUPPORTED_COUNTRIES {
  THAILAND = 'thailand',
  MEXICO = 'mexico',
  SWEDEN = 'sweden'
}

enum SUPPORTED_INDICATORS {
  GDP = "gdp",
  CENTRAL_BANK_BALANCE = "Central Bank Balance Sheet"
}

interface TimeSeriesData {
  date: string;
  value: number;
}

export { SUPPORTED_COUNTRIES, SUPPORTED_INDICATORS };
export type { TimeSeriesData };