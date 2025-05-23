import logger from "./logger.jsx";
import { checkResponse } from "./api.jsx";

const latitude = 32.779167;
const longitude = -96.80889;
const APIkey = "9ed2af8b44ccce6e0959621de59c2764";
const apiRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;

export const getForecastWeather = () => {
  logger("!! WeatherAPI");

  const token = localStorage.getItem("jwt");

  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(apiRequest, headers)
    .then((res) => {
      return checkResponse(res);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error;
    });
};

export const parseWeatherData = (data) => {
  logger(data);
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  logger(weather.temperature);

  return weather;
};
