import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./Store/store";
import { useAppDispatch, useAppSelector } from "./Store/hooks";
import { setAmount, setFromCurrency, setToCurrency, setConvertedAmount } from "./Store/exchangeRateSlice";
import { useExchangeRates, useSupportedCurrencies } from "./Store/useExchangeRates"; 
import { ArrowsRightLeftIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronDownIcon } from "@heroicons/react/24/solid"; // Import Heroicons
const queryClient = new QueryClient();
interface Currency {
  code: string;
  name: string;
}
const currencyToCountryCode: Record<string, string> = {
  USD: "us", EUR: "eu", GBP: "gb", JPY: "jp", AUD: "au", CAD: "ca", CHF: "ch", CNY: "cn",
  INR: "in", BRL: "br", ZAR: "za", MXN: "mx", AED: "ae", AFN: "af", ALL: "al", AMD: "am",
  ANG: "an", AOA: "ao", ARS: "ar", AWG: "aw", AZN: "az", BBD: "bb", BDT: "bd", BGN: "bg",
  BHD: "bh", BIF: "bi", BMD: "bm", BND: "bn", BOB: "bo", BSD: "bs", BTN: "bt", BWP: "bw",
  BYN: "by", BZD: "bz", CLP: "cl", COP: "co", CRC: "cr", CUP: "cu", CVE: "cv", CZK: "cz",
  DJF: "dj", DKK: "dk", DOP: "do", DZD: "dz", EGP: "eg", ERN: "er", ETB: "et", FJD: "fj",
  FKP: "fk", FOK: "fo", GEL: "ge", GGP: "gg", GHS: "gh", GIP: "gi", GMD: "gm", GNF: "gn",
  GTQ: "gt", GYD: "gy", HKD: "hk", HNL: "hn", HRK: "hr", HTG: "ht", HUF: "hu", IDR: "id",
  ILS: "il", ISK: "is", JMD: "jm", JOD: "jo", KES: "ke", KGS: "kg", KHR: "kh", KMF: "km",
  KRW: "kr", KWD: "kw", KYD: "ky", KZT: "kz", LAK: "la", LBP: "lb", LKR: "lk", LRD: "lr",
  LSL: "ls", LYD: "ly", MAD: "ma", MDL: "md", MGA: "mg", MKD: "mk", MMK: "mm", MNT: "mn",
  MOP: "mo", MRU: "mr", MUR: "mu", MVR: "mv", MWK: "mw", MYR: "my", MZN: "mz", NAD: "na",
  NGN: "ng", NIO: "ni", NOK: "no", NPR: "np", NZD: "nz", OMR: "om", PAB: "pa", PEN: "pe",
  PGK: "pg", PHP: "ph", PKR: "pk", PLN: "pl", PYG: "py", QAR: "qa", RON: "ro", RSD: "rs",
  RUB: "ru", RWF: "rw", SAR: "sa", SBD: "sb", SCR: "sc", SDG: "sd", SEK: "se", SGD: "sg",
  SHP: "sh", SLL: "sl", SOS: "so", SRD: "sr", SSP: "ss", STN: "st", SYP: "sy", SZL: "sz",
  THB: "th", TJS: "tj", TMT: "tm", TND: "tn", TOP: "to", TRY: "tr", TTD: "tt", TZS: "tz",
  UAH: "ua", UGX: "ug", UYU: "uy", UZS: "uz", VES: "ve", VND: "vn", VUV: "vu", WST: "ws",
  XAF: "cm", XCD: "ag", XOF: "bj", XPF: "pf", YER: "ye", ZMW: "zm", ZWL: "zw",
};


const getFlagUrl = (currencyCode: string) => {
  const countryCode = currencyToCountryCode[currencyCode] || currencyCode.toLowerCase();
  return `https://flagcdn.com/w40/${countryCode}.png`;
};

function CurrencyConverter() {
  const dispatch = useAppDispatch();
  const { fromCurrency, toCurrency, amount, convertedAmount } = useAppSelector((state) => state.exchangeRates);

  const { data: exchangeRates } = useExchangeRates(fromCurrency);
  const { data: currencies, isLoading } = useSupportedCurrencies(); 

  const handleConvert = () => {
    if (!exchangeRates) return;
    const rate = exchangeRates[toCurrency] || 1;
    dispatch(setConvertedAmount((parseFloat(amount) * rate).toFixed(2)));
  };

  const chartData = exchangeRates
    ? Object.entries(exchangeRates).map(([currency, rate]) => ({ currency, rate }))
    : [];

  return (
    <div className="flex flex-col bg-white justify-center p-8 items-center lg:p-16 md:p-12 min-h-screen">
    <div className="flex flex-col justify-center w-full items-center max-w-[2000px] md:px-8 px-4">
      

    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl w-full max-w-3xl">
  <h2 className="flex justify-center text-xl sm:text-2xl md:text-4xl lg:text-5xl text-center text-gray-800 font-semibold font-serif gap-2 items-center mb-4 sm:mb-5 md:mb-6 lg:mb-8">
    <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-10 md:w-10 lg:h-12 lg:w-12 text-yellow-500" />
    Currency Converter
  </h2>

  <div className="w-full mb-4 md:mb-6">
    <label className="text-sm sm:text-base text-gray-600 block font-medium">Enter Amount</label>
    <div className="relative">
      <input
        type="number"
        value={amount}
        onChange={(e) => dispatch(setAmount(e.target.value))}
        className="border border-gray-300 rounded-xl shadow-sm text-sm sm:text-base md:text-lg w-full duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8 sm:pl-10 md:pl-12 pr-4 py-2 sm:py-3 transition-all"
        placeholder="Enter amount"
      />
      <CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
    </div>
  </div>

  <div className="flex flex-col gap-4 md:flex-row md:mb-6">
    {/* From Currency */}
    <div className="w-full md:w-1/2">
      <label className="text-sm sm:text-base text-gray-600 block font-medium">From</label>
      <div className="flex items-center relative">
        <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="border border-gray-300 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full absolute left-3" />
        <select
          value={fromCurrency}
          onChange={(e) => dispatch(setFromCurrency(e.target.value))}
          className="bg-white border border-gray-300 rounded-xl shadow-sm text-sm sm:text-base md:text-lg w-full appearance-none duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8 sm:pl-10 md:pl-12 pr-6 sm:pr-8 md:pr-10 py-2 sm:py-3 transition-all"
        >
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            currencies?.map(({ code, name }: Currency) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))
          )}
        </select>
        <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 absolute right-3 pointer-events-none" />
      </div>
    </div>

    {/* To Currency */}
    <div className="w-full md:w-1/2">
      <label className="text-sm sm:text-base text-gray-600 block font-medium">To</label>
      <div className="flex items-center relative">
        <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="border border-gray-300 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full absolute left-3" />
        <select
          value={toCurrency}
          onChange={(e) => dispatch(setToCurrency(e.target.value))}
          className="bg-white border border-gray-300 rounded-xl shadow-sm text-sm sm:text-base md:text-lg w-full appearance-none duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-8 sm:pl-10 md:pl-12 pr-6 sm:pr-8 md:pr-10 py-2 sm:py-3 transition-all"
        >
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            currencies?.map(({ code, name }: Currency) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))
          )}
        </select>
        <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 absolute right-3 pointer-events-none" />
      </div>
    </div>
  </div>

  <button
    onClick={handleConvert}
    className="flex bg-blue-600 justify-center rounded-lg text-sm sm:text-base md:text-lg text-white w-full duration-300 font-semibold gap-2 hover:bg-blue-700 items-center py-2 sm:py-3 transition"
  >
    <ArrowsRightLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
    Convert
  </button>

  {convertedAmount && (
    <div className="text-center mt-4 sm:mt-5 md:mt-6">
      <p className="text-gray-800 text-base sm:text-lg md:text-xl">
        {amount} {fromCurrency} = <span className="text-green-600 font-bold">{convertedAmount} {toCurrency}</span>
      </p>
    </div>
  )}
</div>

      
    </div>
  
    {/* Chart Section */}
    <div className="w-full max-w-7xl md:mt-8 md:px-8 mt-6 px-4">
      <h2 className="flex justify-center text-3xl text-center text-gray-800 font-semibold font-serif gap-2 items-center mb-4 md:mb-6 md:text-4xl">
        Exchange Rate Trends
      </h2>
      <ResponsiveContainer width="100%" height={250}>
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
