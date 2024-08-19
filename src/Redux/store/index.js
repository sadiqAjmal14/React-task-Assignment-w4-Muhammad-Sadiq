import { configureStore } from "@reduxjs/toolkit";
import { getWeather } from "../slices/getWeatherApi";
import searchSlice from "../slices/searchSlice";
import unitsSlice from "../slices/UnitsSlice";
export const store = configureStore({
  reducer: {
    units:unitsSlice,
    search: searchSlice,
    [getWeather.reducerPath]: getWeather.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getWeather.middleware),
});
