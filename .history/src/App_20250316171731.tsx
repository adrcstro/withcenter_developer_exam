import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    // Placeholder conversion logic (API call should be implemented here)
    const conversionRate = 0.85; // Example conversion rate
    setResult((parseFloat(amount) * conversionRate).toFixed(2));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Currency Converter
        </h2>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex justify-between space-x-4">
            <select
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <select
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <button
            onClick={handleConvert}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Convert
          </button>
          {result && (
            <div className="text-center text-lg font-semibold text-gray-800">
              Converted Amount: {result} {toCurrency}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
