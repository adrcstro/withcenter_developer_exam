// src/store/exchangeRateSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExchangeRateState {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  convertedAmount: string;
}

const initialState: ExchangeRateState = {
  fromCurrency: "USD",
  toCurrency: "EUR",
  amount: "",
  convertedAmount: "",
};

const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {
    setFromCurrency: (state, action: PayloadAction<string>) => {
      state.fromCurrency = action.payload;
    },
    setToCurrency: (state, action: PayloadAction<string>) => {
      state.toCurrency = action.payload;
    },
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setConvertedAmount: (state, action: PayloadAction<string>) => {
      state.convertedAmount = action.payload;
    },
  },
});

export const { setFromCurrency, setToCurrency, setAmount, setConvertedAmount } = exchangeRateSlice.actions;
export default exchangeRateSlice.reducer;
