import { useState } from "react";
import { ArrowsRightLeftIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleConvert = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    
    // Dummy conversion rate for UI demonstration
    const rate = 1.1; 
    setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[700px]">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center gap-2">
          <CurrencyDollarIcon className="w-8 h-8 text-blue-500" />
          Currency Converter
        </h2>

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-medium" htmlFor="amount">
            Amount
          </label>
          <div className="relative">
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter amount"
              min="0"
              step="0.01"
              aria-label="Amount input"
            />
            <CurrencyDollarIcon className="w-6 h-6 text-gray-500 absolute left-4 top-4" />
          </div>
        </div>

        {/* Currency Selection */}
        <div className="flex gap-4 mb-6">
          <div className="w-1/2">
            <label className="block text-gray-700 text-base font-medium" htmlFor="fromCurrency">
              From
            </label>
            <div className="relative">
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full mt-1 pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Select source currency"
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
            <label className="block text-gray-700 text-base font-medium" htmlFor="toCurrency">
              To
            </label>
            <div className="relative">
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full mt-1 pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Select target currency"
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

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300"
          aria-label="Convert currency"
        >
          <ArrowsRightLeftIcon className="w-6 h-6" />
          Convert
        </button>

        {/* Converted Amount Display */}
        {convertedAmount && (
          <div className="mt-6 text-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-800 text-xl font-medium">
              {amount} {fromCurrency} = 
              <span className="font-bold text-green-600"> {convertedAmount} {toCurrency}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
