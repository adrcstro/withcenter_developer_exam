import { useState, useEffect } from "react";
import { ArrowsRightLeftIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => setExchangeRates(data.rates));
  }, []);

  const handleConvert = () => {
    if (exchangeRates[toCurrency]) {
      setConvertedAmount((parseFloat(amount) * exchangeRates[toCurrency]).toFixed(2));
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-white p-8">
      <div className="flex gap-8">
        {/* Calculator */}
        <div className="bg-white rounded-xl p-8 w-[400px] shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
            <CurrencyDollarIcon className="w-8 h-8 text-blue-500" />
            Currency Converter
          </h2>
          
          {/* Amount Input */}
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

          {/* Currency Selection */}
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-gray-600 text-base font-medium">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
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
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full mt-1 pl-10 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Convert Button */}
          <button
            onClick={handleConvert}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300"
          >
            <ArrowsRightLeftIcon className="w-6 h-6" />
            Convert
          </button>

          {/* Converted Amount */}
          {convertedAmount && (
            <div className="mt-6 text-center">
              <p className="text-gray-800 text-xl">
                {amount} {fromCurrency} = <span className="font-bold text-green-600">{convertedAmount} {toCurrency}</span>
              </p>
            </div>
          )}
        </div>

        {/* Exchange Rates Table */}
        <div className="bg-white rounded-xl p-8 w-[400px] shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Exchange Rates</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Currency</th>
                <th className="border border-gray-300 px-4 py-2">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(exchangeRates).map(([currency, rate]) => (
                <tr key={currency} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{currency}</td>
                  <td className="border border-gray-300 px-4 py-2">{rate.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;