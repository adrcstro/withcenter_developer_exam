import React, { useState } from 'react';

function App() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currency, setCurrency] = useState('EUR');

  const handleConvert = () => {
    // Simple conversion logic for demonstration
    const conversionRates: { [key: string]: number } = {
      EUR: 0.85,
      GBP: 0.75,
      JPY: 110,
    };
    setConvertedAmount(amount * (conversionRates[currency] || 1));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Amount in USD:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Convert to:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
        <button
          onClick={handleConvert}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
        >
          Convert
        </button>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">
            Converted Amount: {convertedAmount.toFixed(2)} {currency}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;