import axios from 'axios';
import type { TEDataPoint } from './types';

const API_KEY = '5fedbfa057ce480:lscx7xsxgxdek2p';
const BASE_URL = 'https://api.tradingeconomics.com';

export const fetchIndicators = async (
  country: string,
  indicator: string
): Promise<TEDataPoint[]> => {
  const response = await axios.get(
    `${BASE_URL}/historical/country/${country}/indicator/${indicator}`,
    {
      params: { c: API_KEY },
    }
  );
  return response.data;
};
