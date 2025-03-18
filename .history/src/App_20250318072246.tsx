import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./Store/store";
import { useAppDispatch, useAppSelector } from "./Store/hooks";
import { setAmount, setFromCurrency, setToCurrency, setConvertedAmount } from "./Store/exchangeRateSlice";
import { useExchangeRates, useSupportedCurrencies } from "./Store/useExchangeRates";
import { ArrowsRightLeftIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const queryClient = new QueryClient();

function SearchableDropdown({ label, value, onChange, options }) {
  const [search, setSearch] = useState("");

  return (
    <div className="w-1/2 relative">
      <label className="block text-gray-600 text-base font-medium">{label}</label>
      <input
        type="text"
        placeholder="Search currency..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mt-1 p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="absolute bg-white border rounded-lg mt-1 w-full max-h-48 overflow-auto shadow-lg">
        {options
          .filter(({ code, name }) => code.toLowerCase().includes(search.toLowerCase()) || name.toLowerCase().includes(search.toLowerCase()))
          .map(({ code, name }) => (
            <div
              key={code}
              onClick={() => {
                onChange(code);
                setSearch("");
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {code} - {name}
            </div>
          ))}
      </div>
    </div>
  );
}

function CurrencyConverter() {
  const dispatch = useAppDispatch();
  const { fromCurrency, toCurrency, amount, convertedAmount } = useAppSelector((state) => state.exchangeRates);
  const { data: exchangeRates } = useExchangeRates(fromCurrency);
  const { data: currencies, isLoading } = useSupportedCurrencies();

  const handleConvert = () => {
    if (!exchangeRates) return;
    const rate = exchangeRates[toCurrency] || 1;
    dispatch(setConvertedAmount((parseFloat(amount) * rate).toFixed(2)));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
          <CurrencyDollarIcon className="w-8 h-8 text-blue-500" />
          Currency Converter
        </h2>
        <div className="mb-6">
          <label className="block text-gray-600 text-base font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => dispatch(setAmount(e.target.value))}
            className="w-full mt-1 p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount"
          />
        </div>

        <div className="flex gap-4 mb-6">
          {isLoading ? (
            <p>Loading currencies...</p>
          ) : (
            <>
              <SearchableDropdown label="From" value={fromCurrency} onChange={(code) => dispatch(setFromCurrency(code))} options={currencies} />
              <SearchableDropdown label="To" value={toCurrency} onChange={(code) => dispatch(setToCurrency(code))} options={currencies} />
            </>
          )}
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300"
        >
          <ArrowsRightLeftIcon className="w-6 h-6" />
          Convert
        </button>

        {convertedAmount && (
          <div className="mt-6 text-center">
            <p className="text-gray-800 text-xl">
              {amount} {fromCurrency} = <span className="font-bold text-green-600">{convertedAmount} {toCurrency}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CurrencyConverter />
      </QueryClientProvider>
    </Provider>
  );
}