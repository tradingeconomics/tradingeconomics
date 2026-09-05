// src/services/indicatorService.js
import apiClient from './apiClient';


export const fetchIndicators = async () => {
  const { data } = await apiClient.get('/indicators');
  return data.map((c) => c.Category).sort(); // return list of country names
};


/**
 * Get all indicators for a specific country.
 * @param {string} country - Country name (e.g., 'mexico')
 */
export const getIndicatorsByCountry = async (country) => {
  const response = await apiClient.get(`/country/${country}`);
  return response.data;
};

/**
 * Get indicators by country and category group.
 * @param {string} country - Country name
 * @param {string} group - Category group (e.g., 'gdp', 'labour', etc.)
 */
export const getIndicatorsByCountryAndGroup = async (country, group) => {
  const response = await apiClient.get(`/country/${country}`, {
    params: {
      group, // This gets merged with the global API key param
    },
  });
  return response.data;
};

/**
 * Get indicator data across all countries for a specific indicator (e.g., 'gdp').
 * @param {string} indicator - Indicator name
 */
export const getIndicatorsByIndicator = async (indicator) => {
  const response = await apiClient.get(`/country/all/${indicator}`);
  return response.data;
};
