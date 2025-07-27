import axios from "axios";

export const api = axios.create({
  baseURL: `https://api.tradingeconomics.com`,
  headers: {
    Accept: "application/json",
  },
});
