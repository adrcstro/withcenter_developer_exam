import { useState } from "react";
import "@fontsource/montserrat"; 

const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleConvert = () => {
    // Dummy conversion rate for UI demo
    const rate = 1.1; 
    setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white  rounded-xl p-6 w-96">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4 font-montserrat">Currency Converter</h2>
        
        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium font-montserrat">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount"
          />
        </div>

        {/* Currency Selection */}
        <div className="flex gap-3 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-600 text-sm font-medium">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-gray-600 text-sm font-medium">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Convert
        </button>

        {/* Converted Amount */}
        {convertedAmount && (
          <div className="mt-4 text-center">
            <p className="text-gray-700 text-lg">
              {amount} {fromCurrency} = <span className="font-bold text-green-600">{convertedAmount} {toCurrency}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
