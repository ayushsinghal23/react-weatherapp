/** @format */

import React, { useState } from "react";
const api = {
	key: "4f30ced6bcb3d3f4aee7eb351396abe3",
};
function App() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});
	const search = (evt) => {
		if (evt.key === "Enter") {
			fetch(
				// `api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${api.key}`
				`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api.key}`
			)
				.then((res) => res.json())
				.then((result) => {
					setQuery("");
					setWeather(result);
					console.log(result);
				});
		}
	};
	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday",
		];
		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();
		return `${day}, ${date} ${month} ${year}`;
	};
	return (
		<div
			className={
				typeof weather.main != "undefined"
					? weather.main.temp > 16
						? "app warm"
						: "app"
					: "app"
			}
		>
			<main>
				<div className="search-box">
					<input
						type="text"
						placeholder="Search..."
						className="search-bar"
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != "undefined" ? (
					<div>
						<div className="location-box">
							<div className="location">{weather.name} </div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp">
								{Math.round(weather.main.temp)}
								°C
							</div>
							<div className="weather">{weather.weather[0].main}</div>
						</div>
					</div>
				) : (
					""
				)}
				{weather.cod === "404" ? (
					<div className="weather-box">
						<div className="weather">SORRY CAN'T FIND OUR CITY</div>
					</div>
				) : (
					""
				)}
			</main>
		</div>
	);
}
export default App;
