import { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";

const CountryCityContext = createContext({});

export const CountryCityProvider = ({ children }) => {
	const [country, setCountry] = useState("");
	const [countries, setCountries] = useState([]);

	const [city, setCity] = useState("");
	const [cities, setCities] = useState([]);

	return (
		<CountryCityContext.Provider
			value={{
				country,
				setCountry,
				countries,
				setCountries,
				city,
				setCity,
				cities,
				setCities,
			}}
		>
			{children}
		</CountryCityContext.Provider>
	);
};

CountryCityProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

// custom hook:
export const useCountryCity = () => useContext(CountryCityContext);
