export interface EconomicIndicator {
  Country: string;
  Category: string;
  Title: string;
  LatestValueDate: string;
  LatestValue: number;
  Unit: string;
  CategoryGroup: string;
  Frequency: string;
  PreviousValue: number;
  PreviousValueDate: string;
}

export interface SortConfig {
  key: keyof EconomicIndicator;
  direction: "asc" | "desc";
}

export interface BarDataProps {
  data: EconomicIndicator[];
  selectedIndicator: Partial<EconomicIndicator>;
  onSelectIndicator: (indicator: Partial<EconomicIndicator>) => void;
}

export interface PieDataProps {
  data: EconomicIndicator[];
}

export interface TableDataProps {
  data: EconomicIndicator[];
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}

export interface CountriesListProps {
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  countries: string[];
  error: string | null;
}
