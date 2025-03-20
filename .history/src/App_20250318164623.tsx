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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 md:p-12 lg:p-16">
    <div className="flex flex-col items-center justify-center w-full max-w-[2000px] px-4 md:px-8">
      <div className="bg-white rounded-xl p-6 md:p-8 w-full max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 text-center mb-4 md:mb-6 flex items-center justify-center gap-2">
          <CurrencyDollarIcon className="w-8 md:w-10 h-8 md:h-10 text-yellow-500" />
          Currency Converter
        </h2>
  
        <div className="mb-4 md:mb-6 w-full">
          <label className="block text-gray-600 text-base font-medium">Enter Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => dispatch(setAmount(e.target.value))}
              className="w-full mt-1 pl-10 md:pl-12 pr-4 py-2 md:py-3 border border-gray-300 rounded-xl text-base md:text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter amount"
            />
            <CurrencyDollarIcon className="w-6 md:w-7 h-6 md:h-7 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
  
        <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-6">
          {/* From Currency */}
          <div className="w-full md:w-1/2">
            <label className="block text-gray-600 text-base font-medium">From</label>
            <div className="relative flex items-center">
              <img
                src={getFlagUrl(fromCurrency)}
                alt={fromCurrency}
                className="w-5 md:w-6 h-5 md:h-6 absolute left-3 rounded-full border border-gray-300"
              />
              <select
                value={fromCurrency}
                onChange={(e) => dispatch(setFromCurrency(e.target.value))}
                className="w-full mt-1 pl-10 md:pl-12 pr-8 md:pr-10 py-2 md:py-3 border border-gray-300 rounded-xl text-base md:text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white transition-all duration-200"
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
              <ChevronDownIcon className="w-4 md:w-5 h-4 md:h-5 absolute right-3 text-gray-600 pointer-events-none" />
            </div>
          </div>
  
          {/* To Currency */}
          <div className="w-full md:w-1/2">
            <label className="block text-gray-600 text-base font-medium">To</label>
            <div className="relative flex items-center">
              <img
                src={getFlagUrl(toCurrency)}
                alt={toCurrency}
                className="w-5 md:w-6 h-5 md:h-6 absolute left-3 rounded-full border border-gray-300"
              />
              <select
                value={toCurrency}
                onChange={(e) => dispatch(setToCurrency(e.target.value))}
                className="w-full mt-1 pl-10 md:pl-12 pr-8 md:pr-10 py-2 md:py-3 border border-gray-300 rounded-xl text-base md:text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white transition-all duration-200"
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
              <ChevronDownIcon className="w-4 md:w-5 h-4 md:h-5 absolute right-3 text-gray-600 pointer-events-none" />
            </div>
          </div>
        </div>
  
        <button
          onClick={handleConvert}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg font-semibold py-2 md:py-3 rounded-lg flex items-center justify-center gap-2 transition duration-300"
        >
          <ArrowsRightLeftIcon className="w-5 md:w-6 h-5 md:h-6" />
          Convert
        </button>
  
        {convertedAmount && (
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-gray-800 text-lg md:text-xl">
              {amount} {fromCurrency} = <span className="font-bold text-green-600">{convertedAmount} {toCurrency}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  
    {/* Chart Section */}
    <div className="w-full max-w-7xl mt-6 md:mt-8 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800 text-center mb-4 md:mb-6 flex items-center justify-center gap-2">
        Exchange Rate Trends
      </h2>
      <ResponsiveContainer width="100%" height={350}>
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
