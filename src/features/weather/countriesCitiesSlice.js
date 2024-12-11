import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// initial state:
const initialState = {
	countries: [],
	cities: [],
	country: "",
	city: "",
};

export const fetchCountries = createAsyncThunk(
	"countries/fetchCountries",
	async () => {
		const response = await axios.get(
			"https://countriesnow.space/api/v0.1/countries"
    );
    
		// !!!!!!!!!!!!! important !!!!!!!!!!!!!!!!!
		// [Every thing in the return of thunk function is automatically will included to {action.payload}]
		return response.data.data;
	}
);

export const countriesCitiesSlice = createSlice({
	name: "countriesCities",
	initialState: initialState,
	reducers: {
		setCountry: (state, action) => {
			state.country = action.payload;
			const countryData = state.countries.find(
				(c) => c.country === action.payload
			);
			//! it's an amazing thing:
			state.cities = countryData ? countryData.cities : [];
		},
		setCity: (state, action) => {
			state.city = action.payload;
		},
	},
	extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      
			// !!!!!!!!!!!!! important !!!!!!!!!!!!!!!!!
			// [Every thing in the return of thunk function is automatically will included to {action.payload}]
			state.countries = action.payload;
		});
	},
});

export const { setCity, setCountry } = countriesCitiesSlice.actions;
export default countriesCitiesSlice.reducer;
