export type CalendarEvent = {
  Country: string;
  Event: string;
  Date: string;
  Importance: number;
  Actual: number | string | null;
  Forecast: number | string | null;
  Previous: number | string | null;
};
