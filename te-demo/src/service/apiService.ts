import type { AvailableCountriesTypes } from "@/consts";
import axios from "axios";

const API_KEY = "api_key_here";
const BASE_URL = "https://api.tradingeconomics.com";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: { c: API_KEY },
});

export const getHistoricalIndicatorTimeSeries = async (
  country: AvailableCountriesTypes,
  indicator: string,
) => {
  const response = await apiClient.get(
    `/historical/country/${country}/indicator/${indicator}`,
  );
  return response.data;
};

export const getCreditRatings = async () => {
  const response = await apiClient.get(`/credit-ratings`);
  return response.data;
};

export const getEconomicCalendarByCountry = async (
  country: AvailableCountriesTypes,
) => {
  const response = await apiClient.get(
    `/calendar/country/${country.toLowerCase()}`,
  );
  return response.data;
};
