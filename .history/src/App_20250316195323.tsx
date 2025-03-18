import { useState } from "react";
import { ArrowsRightLeftIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import converterImage from "./assets/Manage money-cuate.svg"

const currencies = ["USD", "EUR", "GBP", "JPY", "INR"];

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleConvert = () => {
    const rate = 1.1;
    setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative bg-white rounded-xl p-8 w-[700px] flex">
        <div className="w-3/4">
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

        {/* Right-side SVG Image */}
        <div className="w-1/4 flex justify-end">
          <img src={converterImage} alt="Converter Illustration" className="w-28 h-28" />
        </div>
      </div>
    </div>
  );
}

export default App;