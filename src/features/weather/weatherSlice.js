import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk("fetchWeather", async (city) => {
	console.log("calling fetchWeather...", city);
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d42cd3dc377b8f4ca3de3b645a19b84`
	);

	// Extract and return relevant data from the response
	const min = Number(response.data.main.temp_min) - 272.15;
	const max = Number(response.data.main.temp_max) - 272.15;
	const main = Number(response.data.main.temp) - 272.15;
	const desc = response.data.weather[0].description;
	const icon = response.data.weather[0].icon;

	// !!!!!!!!!!!!! important !!!!!!!!!!!!!!!!!
	// !!!!!!!!!!!!! important !!!!!!!!!!!!!!!!!
	// !!!!!!!!!!!!! important !!!!!!!!!!!!!!!!!
	// [Every thing in the return of thunk function is automatically will included to {action.payload}]
	return {
		minTemp: min.toFixed(1),
		maxTemp: max.toFixed(1),
		mainTemp: main.toFixed(1),
		description: desc,
		icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
	};
});

export const weatherSlice = createSlice({
	name: "weatherApi",
	initialState: {
		weather: {
			mainTemp: 0,
			minTemp: 0,
			maxTemp: 0,
			description: ``,
			icon: `https://openweathermap.org/img/wn/10d@2x.png`,
		},
		isLoading: false,
	},
	reducers: {
		changeState: () => {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.isLoading = false;

				// !!!!!!!!!!!!! important !!!!!!!!!!!!!!!!!
				// [Every thing in the return of thunk function is automatically will included to {action.payload}]
				state.weather = action.payload;
			})
			.addCase(fetchWeather.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchWeather.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const { changeState } = weatherSlice.actions;
export default weatherSlice.reducer;
