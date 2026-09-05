// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // example: https://api.tradingeconomics.com
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    c: process.env.NEXT_PUBLIC_API_KEY, // API key as query param
  };
  return config;
}

);

export default apiClient;
