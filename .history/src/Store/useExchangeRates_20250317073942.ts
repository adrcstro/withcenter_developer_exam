// src/store/useExchangeRates.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = "a532237798c886cb201fa22c";
const BASE_URL = "https://v6.exchangerate-api.com/v6";

const fetchExchangeRates = async (fromCurrency: string) => {
  const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);
  return response.data.conversion_rates;
};

export const useExchangeRates = (fromCurrency: string) => {
  return useQuery({
    queryKey: ["exchangeRates", fromCurrency],
    queryFn: () => fetchExchangeRates(fromCurrency),
    staleTime: 1000 * 60 * 10, // 10 minutes cache time
  });
};
