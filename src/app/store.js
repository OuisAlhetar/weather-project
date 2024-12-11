import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";
import countriesCitiesReducer from "../features/weather/countriesCitiesSlice";

export const store = configureStore({
	reducer: {
		weatherApi: weatherReducer,
		countriesCities: countriesCitiesReducer,
	},
});
