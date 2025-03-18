import { useState } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const exchangeRate = 57.25;
  const [convertedAmount, setConvertedAmount] = useState(amount * exchangeRate);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
    setConvertedAmount(value * exchangeRate);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Philippine peso (PHP)</span>
          <span className="text-orange-500 cursor-pointer">change</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-2xl">₱</span>
          <input
            type="number"
            className="w-full text-2xl bg-transparent outline-none ml-2"
            value={convertedAmount.toFixed(2)}
            disabled
          />
        </div>
        <div className="text-xs text-gray-500">Try: 200 + 10%</div>
        
        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>United States dollar (USD)</span>
          <span className="text-orange-500 cursor-pointer">change</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="text-2xl">$</span>
          <input
            type="number"
            className="w-full text-2xl bg-transparent outline-none ml-2"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="text-xs text-gray-500">Or: (10 + 25) * 4 - 5%</div>
        
        <div className="text-center text-orange-500 mt-4 cursor-pointer">Swap</div>
      </div>
    </div>
  );
}

export default App;
