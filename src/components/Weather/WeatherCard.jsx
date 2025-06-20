import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.jsx";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/config.jsx";

const WeatherCard = ({ weatherTemp, day, type }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const imageSrc = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  });

  if (imageSrc) {
    const imageSrcUrl = imageSrc.url || "";
    return (
      <section className="weather" id="weather">
        <div className="weather__info">
          {weatherTemp} {currentTemperatureUnit}
        </div>
        <img
          src={imageSrcUrl}
          alt="weather display"
          className="weather__image"
        />
      </section>
    );
  }
};

export default WeatherCard;
