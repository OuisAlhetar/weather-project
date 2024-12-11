import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import axios from "axios";

// Context:
// import { useCountryCity } from "../contexts/Counteries-Cities-Context";
import { Typography } from "@mui/material";

// Redux slice:
import { useSelector, useDispatch } from "react-redux";
import {
	fetchCountries,
	setCity,
	setCountry,
} from "../features/weather/countriesCitiesSlice";

export default function SelectSmall() {
	const dispatch = useDispatch();
	const { countries, cities, country, city } = useSelector((state) => {
		return state.countriesCities;
	});

	React.useEffect(() => {
		dispatch(fetchCountries());
	}, [dispatch])
	
	const handleChangeCountry = (event) => {
		dispatch(setCountry(event.target.value));
	}

	const handleChangeCity = (event) => {
		dispatch(setCity(event.target.value));
	}

	// const {
	// 	country,
	// 	setCountry,
	// 	countries,
	// 	setCountries,
	// 	city,
	// 	setCity,
	// 	cities,
	// 	setCities,
	// } = useCountryCity();

	// const handleChangeCountry = (event) => {
	// 	const selectedCountry = event.target.value;
	// 	setCountry(selectedCountry);
	// 	// Find the selected country's cities and set them
	// 	const selectedCountryData = countries.find(
	// 		(c) => c.country === selectedCountry
	// 	);
	// 	if (selectedCountryData) {
	// 		setCities(selectedCountryData.cities);
	// 	} else {
	// 		setCities([]);
	// 	}
	// };

	// const handleChangeCity = (event) => {
	// 	setCity(event.target.value);
	// };

	// React.useEffect(() => {
	// 	axios
	// 		.get("https://countriesnow.space/api/v0.1/countries")
	// 		.then((response) => {
	// 			setCountries(response.data.data);
	// 		})
	// 		.catch((e) => {
	// 			console.log(e);
	// 		});
	// }, []);

	return (
		<div style={{ margin: "30px auto", maxWidth: "60%" }}>
			<Typography
				variant="h1"
				sx={{ fontSize: "2rem", color: "white", fontWeight: "400" }}
			>
				Choose City
			</Typography>
			
			<FormControl className="select-container" sx={{ m: 1, minWidth: 120, width: "20%" }} size="small">
				<InputLabel
					id="demo-select-small-country-label"
					sx={{ color: "black", fontWeight: "800" }}
				>
					Country
				</InputLabel>
				<Select
					labelId="demo-select-small-country-label"
					id="demo-select-small-country"
					value={country}
					label="Country"
					onChange={handleChangeCountry}
					color="secondary"
					sx={{ background: "white", width: "100%" }}
					autoWidth
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{countries.map((country) => (
						<MenuItem key={country.iso2} value={country.country}>
							{country.country}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120, width: "20%" }} size="small">
				<InputLabel
					id="demo-select-small-city-label"
					sx={{ color: "black", fontWeight: "800" }}
				>
					City
				</InputLabel>
				<Select
					labelId="demo-select-small-city-label"
					id="demo-select-small-city"
					value={city}
					label="City"
					onChange={handleChangeCity}
					color="secondary"
					sx={{ background: "white", width: "100%" }}
					autoWidth
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
					{cities.map((city, index) => (
						<MenuItem key={index} value={city}>
							{city}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
