export type HistoricalPoint = {
  symbol: string;
  date: string;
  value: number;
};

export type SnapshotRow = {
  symbol: string;
  last: number;
  date: string;
  previous: number;
  previousDate: string;
  country: string;
  category: string;
  description: string;
  frequency: string;
  unit: string;
  title: string;
  lastUpdate: string;
  consensus?: number | null;
  forecast?: number | null;
};

export class DataApiError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "DataApiError";
    this.status = status;
    this.url = url;
  }
}
