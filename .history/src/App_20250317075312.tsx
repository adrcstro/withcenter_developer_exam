// src/App.tsx
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./Store/store";
import { useAppDispatch, useAppSelector } from "./Store/hooks";
import { setAmount, setFromCurrency, setToCurrency, setConvertedAmount } from "./Store/exchangeRateSlice";
import { useExchangeRates } from "./Store/useExchangeRates";
import { ArrowsRightLeftIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];
const queryClient = new QueryClient();

function CurrencyConverter() {
  const dispatch = useAppDispatch();
  const { fromCurrency, toCurrency, amount, convertedAmount } = useAppSelector((state) => state.exchangeRates);
  const { data: exchangeRates} = useExchangeRates(fromCurrency);

  const handleConvert = () => {
    if (!exchangeRates) return;
    const rate = exchangeRates[toCurrency] || 1;
    dispatch(setConvertedAmount((parseFloat(amount) * rate).toFixed(2)));
  };

  const chartData = exchangeRates ?
    Object.entries(exchangeRates).map(([currency, rate]) => ({ currency, rate })) : [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
 <div className="flex flex-col items-center justify-center w-full max-w-[2000px] px-8">

    <div className="bg-white rounded-xl p-8 w-full max-w-lg">

          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
            <CurrencyDollarIcon className="w-8 h-8 text-blue-500" />
            Currency Converter
          </h2>

          <div className="mb-6">
            <label className="block text-gray-600 text-base font-medium">Amount</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => dispatch(setAmount(e.target.value))}
                className="w-full mt-1 pl-12 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter amount"
              />
              <CurrencyDollarIcon className="w-6 h-6 text-gray-500 absolute left-4 top-4" />
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-gray-600 text-base font-medium">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => dispatch(setFromCurrency(e.target.value))}
                className="w-full mt-1 pl-10 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-600 text-base font-medium">To</label>
              <select
                value={toCurrency}
                onChange={(e) => dispatch(setToCurrency(e.target.value))}
                className="w-full mt-1 pl-10 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
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
      
      {/* Chart Section */}
      <div className="w-full max-w-7xl mt-8">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">Exchange Rate Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="currency" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="rate" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
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