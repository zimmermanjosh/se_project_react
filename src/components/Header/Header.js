import "./Header.css";
import DateTime from "../DateTime/DateTime.js";
import React, { useState, useEffect } from "react";
import logoImage from "../../images/dashboard/logo.svg";
import avatarImage from "../../images/dashboard/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import log from "../../utils/loggerger.js";
import { getForecastWeather } from "../../utils/WeatherApi.js";
import { Link } from "react-router-dom";
import { userNameProfile } from "../../utils/Constants.js";

const Header = ({ onCreateModal }) => {
  logger("!! Header");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Check if Geolocation is available in the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Retrieve the latitude and longitude from the position object
        const { latitude, longitude } = position.coords;
        logger("Latitude:", latitude);
        logger("Longitude:", longitude);

        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=20740fa69bd84624bf45f4a801ef40c3`,
        )
          .then((response) => response.json())
          .then((data) => {
            const city = data.results[0].components.city;
            const state = data.results[0].components.state;
            setLocation(`${city}, ${state}`);

            logger("City:", city);
            logger("State:", state);

            // pass the location data to the parent weatherAPI component
            getForecastWeather(latitude, longitude)
              .then((weatherData) => {
                logger("Weather Data:", weatherData);
              })
              .catch((error) => {
                console.error("Error fetching weather data:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching location data:", error);
          });
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logoImage} alt="logo"></img>
          </Link>
        </div>
        <div>
          <DateTime />
        </div>
        <div className="header__location">{location || "Loading..."}</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button
            type="toggle"
            onClick={onCreateModal}
            className="header__toggle_switch-button"
          ></button>
        </div>
        <div>
          <button
            type="text"
            onClick={onCreateModal}
            className="header__clothes-button"
          >
            + add clothes
          </button>
        </div>
        <Link to="/profile">
          <div className="header__name">{userNameProfile}</div>
        </Link>
        <div>
          <img src={avatarImage} alt="avatar"></img>
        </div>
      </div>
    </header>
  );
};
export default Header;
