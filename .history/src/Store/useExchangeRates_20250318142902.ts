import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

const fetchCurrencies = async () => {
  const response = await axios.get(`${BASE_URL}/${API_KEY}/codes`);
  return response.data.supported_codes.map(([code, name]: [string, string]) => ({
    code,
    name,
  }));
};
const fetchExchangeRates = async (fromCurrency: string) => {
  const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);
  return response.data.conversion_rates;
};
export const useExchangeRates = (fromCurrency: string) => {
  return useQuery({
    queryKey: ["exchangeRates", fromCurrency],
    queryFn: () => fetchExchangeRates(fromCurrency),
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
};
export const useSupportedCurrencies = () => {
  return useQuery({
    queryKey: ["supportedCurrencies"],
    queryFn: fetchCurrencies,
    staleTime: Infinity, 
  });
};
