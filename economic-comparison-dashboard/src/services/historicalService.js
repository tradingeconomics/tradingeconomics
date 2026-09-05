import apiClient from "./apiClient";

export const fetchHistoricalData = async (country, indicator) => {
  try {
    const {
      data
    } = await apiClient.get(`/historical/country/${country}/indicator/${indicator}`);
    return {
      data,
      error: data[0].Country.includes("Free accounts") ? data[0].Country : null
    };
  } catch (error) {
    return {
      data: [],
      error: error?.response?.data || "Unable to fetch historical data.",
    };
  }
};