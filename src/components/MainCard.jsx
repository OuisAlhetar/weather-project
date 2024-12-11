// css
import "../App.css";

// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

// icons:
import CloudIcon from "@mui/icons-material/Cloud";

// Context: 'doesn't used replaced by redux way'
// import { useCountryCity } from "../contexts/Counteries-Cities-Context";

// Hooks:
import { useEffect, useState } from "react";

// for [localization and translation]:
import moment from "moment";
import "moment/locale/ar"; // Import Arabic locale
import { useTranslation } from "react-i18next";

// for [redux] store:
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../features/weather/weatherSlice";

// variable or func for cleanup Effect:
// let cancelAxios = () => {};

export default function MainCard() {
	// const { city } = useCountryCity(); //! ignored

	const city = useSelector((state) => {
		return state.countriesCities.city;
	});

	const { maxTemp, minTemp, mainTemp, description, icon } = useSelector(
		(state) => {
			return state.weatherApi.weather;
		}
	);

	const isLoading = useSelector((state) => {
		return state.weatherApi.isLoading;
	});

	// [redux]:

	const dispatch = useDispatch();

	// for translation:
	const { t, i18n } = useTranslation();

	// ========== States =====================
	const [dateTime, setDateTime] = useState("");
	const [locales, setLocales] = useState("ar");

	// const [tempState, setTempState] = useState({
	// 	maxTemp: 0,
	// 	minTemp: 0,
	// 	mainTemp: 0,
	// 	description: ``,
	// 	icon: `https://openweathermap.org/img/wn/10d@2x.png`,
	// });

	const direction = locales == "ar" ? "rtl" : "ltr";
	const apiKey = `3d42cd3dc377b8f4ca3de3b645a19b84`;

	// Manage the Localization and Translation:
	useEffect(() => {
		i18n.changeLanguage(locales);
		// [redux test]:
		dispatch(fetchWeather(city));
	}, [city]);

	// Manage Data Fetching from API
	useEffect(() => {
		setDateTime(moment().format("LLLL"));
	}, [city, apiKey]);

	// =========== Handlers ===============
	function handleLanguageChoose() {
		if (locales == "ar") {
			setLocales("en");
			moment.locale("en");
			i18n.changeLanguage("en");
		} else {
			setLocales("ar");
			moment.locale("ar");
			i18n.changeLanguage("ar");
		}
		setDateTime(moment().format("LLLL"));
	}

	return (
		<Container
			maxWidth="sm"
			className="weather-container"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				mx: "auto",
				fontFamily: "ReadexPro, sans-serif",
			}}
		>
			<Card
				dir={direction}
				sx={{
					minWidth: 480,
					bgcolor: "#093e9b",
					mx: "auto",
					padding: "10px",
					borderRadius: "20px",
					boxShadow: "0 10px 20px rgba(0, 40, 114,.7)",
				}}
			>
				<CardContent dir={direction}>
					<Box sx={{ flexGrow: 1, color: "white" }}>
						<Grid container spacing={2} className="card-header">
							<Grid item xs={8}>
								<h1
									style={{
										textAlign: locales == "ar" ? "right" : "left",
										fontSize: "2.5rem",
									}}
								>
									{city ? t(city) : t("Choose City")}
								</h1>
							</Grid>
							<Grid
								item
								xs={4}
								sx={{
									display: "flex",
									justifyContent: "start",
									alignItems: "end",
								}}
							>
								{dateTime}
							</Grid>
						</Grid>
						<Divider sx={{ bgcolor: "white" }} />

						{/* Main Weather info */}
						<Grid container spacing={2} sx={{ mt: 3 }}>
							<Grid item xs={6}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-evenly",
										alignItems: "start",
									}}
								>
									<h1
										style={{
											textAlign: locales == "ar" ? "right" : "left",
											fontSize: "6rem",
											fontWeight: "500",
										}}
									>
										{isLoading ? (
											<CircularProgress style={{ color: "white" }} />
										) : (
											mainTemp
										)}
									</h1>
									{/* <NightsStayIcon sx={{ fontSize: "3.4rem" }} /> */}
									<img
										src={icon}
										alt={`${description}`}
										style={{ width: "70px", height: "70px" }}
									/>
								</div>

								{/*  */}
								<div>
									<h4
										style={{
											textAlign: locales == "ar" ? "right" : "left",
											margin: "10px",
											fontSize: "1.4rem",
											fontWeight: "500",
										}}
									>
										{t(description)}
									</h4>
									<div
										style={{
											display: "flex",
											justifyContent: "space-around",
											alignItems: "center",
											margin: "15px 0",
										}}
									>
										<p
											style={{
												fontSize: "1rem",
												padding: "2px",
												fontWeight: "600",
											}}
										>
											{t("max")} : {maxTemp}
										</p>
										<p
											style={{
												fontSize: "1rem",
												padding: "2px",
												fontWeight: "900",
												color: "rgb(72, 72, 74)",
											}}
										>
											|
										</p>
										<p
											style={{
												fontSize: "1rem",
												padding: "2px",
												fontWeight: "600",
											}}
										>
											{t("min")}: {minTemp}
										</p>
									</div>
								</div>
							</Grid>
							<Grid
								item
								xs={6}
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<CloudIcon sx={{ fontSize: "10rem" }} />
							</Grid>
						</Grid>
					</Box>
				</CardContent>
			</Card>
			<div
				dir={direction}
				style={{
					display: "flex",
					justifyContent: "end",
					width: "100%",
					marginTop: "10px",
				}}
			>
				<Button
					sx={{ fontSize: "1.2rem", fontWeight: "300", color: "white" }}
					onClick={handleLanguageChoose}
				>
					{locales == "ar" ? "إنجليزي" : "ARABIC"}
				</Button>
			</div>
		</Container>
	);
}
