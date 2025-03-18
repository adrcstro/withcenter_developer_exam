import React, { useState, useEffect } from "react";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currency, setCurrency] = useState("EUR");
  const [rates, setRates] = useState({ EUR: 0.85, GBP: 0.75, JPY: 110 });

  useEffect(() => {
    // Simulating an API call for live conversion rates
    setRates({ EUR: 0.85, GBP: 0.75, JPY: 110 });
  }, []);

  const handleConvert = () => {
    const rate = rates[currency] || 1;
    setConvertedAmount(amount ? (parseFloat(amount) * rate).toFixed(2) : 0);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Currency Converter
        </h1>
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 mb-1">
            Amount in USD:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter amount"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 dark:text-gray-300 mb-1">
            Convert to:
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
        <button
          onClick={handleConvert}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-all"
        >
          Convert
        </button>
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {amount ? `Converted: ${convertedAmount} ${currency}` : "Enter an amount"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
