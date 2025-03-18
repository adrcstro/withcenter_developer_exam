import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store, setAmount, setFromCurrency, setToCurrency, setConvertedAmount } from "./store";
import { useExchangeRates, useSupportedCurrencies } from "./api";
import { currencyToCountryCode, getFlagUrl } from "./utils";
import { AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";
import { ArrowsRightLeftIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

const queryClient = new QueryClient();

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency, amount, convertedAmount } = useSelector(state => state.exchange);
  const exchangeRates = useExchangeRates(fromCurrency);
  const currencies = useSupportedCurrencies();

  const handleConvert = () => {
    const rate = exchangeRates[toCurrency] || 1;
    dispatch(setConvertedAmount(amount * rate));
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <CurrencyDollarIcon className="w-6 h-6 text-blue-500" /> Currency Converter
        </h1>
        
        <div className="space-y-4">
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => dispatch(setAmount(Number(e.target.value)))}
            placeholder="Enter amount"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          
          <div className="flex justify-between items-center gap-2">
            <select 
              value={fromCurrency} 
              onChange={(e) => dispatch(setFromCurrency(e.target.value))}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <ArrowsRightLeftIcon className="w-6 h-6 text-gray-500" />
            <select 
              value={toCurrency} 
              onChange={(e) => dispatch(setToCurrency(e.target.value))}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleConvert} 
            className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Convert
          </button>
          
          <div className="text-lg font-semibold text-center mt-4">
            Converted Amount: <span className="text-blue-600">{convertedAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-700">Exchange Rate Trend</h2>
        <AreaChart width={300} height={200} data={Object.entries(exchangeRates).map(([key, value]) => ({ date: key, rate: value }))}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="rate" stroke="#3b82f6" fill="#93c5fd" />
        </AreaChart>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <CurrencyConverter />
    </Provider>
  </QueryClientProvider>
);

export default App;