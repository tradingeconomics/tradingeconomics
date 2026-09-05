import apiClient from './apiClient';

export const fetchCountries = async () => {
  const { data } = await apiClient.get('/country');
  return data.map((c) => c.Country).sort(); // return list of country names
};
