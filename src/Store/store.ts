// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import exchangeRateReducer from "./exchangeRateSlice";

export const store = configureStore({
  reducer: {
    exchangeRates: exchangeRateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
