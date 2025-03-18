import { useState, useEffect } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowsRightLeftIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

const API_KEY = "a532237798c886cb201fa22c";
const BASE_URL = "https://v6.exchangerate-api.com/v6";

const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState<{ currency: string; rate: number }[]>([]);

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency]);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${fromCurrency}`);
      const rates = response.data.conversion_rates;
      const data = Object.keys(rates).map(currency => ({
        currency,
        rate: rates[currency],
      }));
      setExchangeRates(data);
    } catch (error) {
      console.error("Error fetching exchange rates", error);
    }
  };

  const handleConvert = () => {
    const rate = exchangeRates.find(rate => rate.currency === toCurrency)?.rate || 1;
    setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
      <div className="flex flex-row gap-8 w-full max-w-[1800px]">
        {/* Currency Converter */}
        <div className="bg-white rounded-xl p-8 w-1/2 ">
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
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-1 pl-12 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter amount"
              />
              <CurrencyDollarIcon className="w-6 h-6 text-gray-500 absolute left-4 top-4" />
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-gray-600 text-base font-medium">From</label>
              <div className="relative">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full mt-1 pl-10 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <CurrencyDollarIcon className="w-6 h-6 text-gray-500 absolute left-3 top-4" />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block text-gray-600 text-base font-medium">To</label>
              <div className="relative">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full mt-1 pl-10 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
                <CurrencyDollarIcon className="w-6 h-6 text-gray-500 absolute left-3 top-4" />
              </div>
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

        {/* Exchange Rate Chart */}
        <div className="w-1/2 p-6 bg-white rounded-xl ">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Exchange Rate Trends</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={exchangeRates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="currency" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="rate" stroke="#2563eb" fill="#93c5fd" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
