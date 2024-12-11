// styles
import "./App.css";
import "./assets/FontsConfig.css";

// Material UI components
import { createTheme, ThemeProvider } from "@mui/material";

// Components:
import MainCard from "./components/MainCard";
import CitySelector from "./components/CitySelector";

// Provider:
import { CountryCityProvider } from "./contexts/Counteries-Cities-Context";

// external lib:
// import i18n (needs to be bundled ;))
import "./i18n";

// theming:
const theme = createTheme({
	palette: {
		primary: {
			main: "#0048c7",
		},
		secondary: {
			main: "#fff",
		},
	},
	typography: {
		fontFamily: "ReadexPro, sans-serif",
		fontWeightLight: "500",
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CountryCityProvider>
				<MainCard />
				<CitySelector />
			</CountryCityProvider>
		</ThemeProvider>
	);
}

export default App;
