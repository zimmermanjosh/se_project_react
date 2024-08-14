import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import "./WeatherCard.css";
import { weatherOptions } from "../../utils/Constants.js";

/*const WeatherCard = ({ weatherTemp, day, type }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const imageSrc = weatherOptions.filter((item) => {
    return item.day === day && item.type === type;
  });

  if (imageSrc) {
    const imageSrcUrl = imageSrc[0] || ""; // Added a check here

    return (
      <section className="weather" id="weather">
        <div
          className="weather__info">
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
};*/
/*
const WeatherCard = ({ weatherTemp, day, type }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
   // Log the props to ensure they are correct
   console.log("WeatherCard props:", { weatherTemp, day, type });



  const imageSrc = weatherOptions.filter((item) => {
    return item.day === day && item.type === type;
  });

  // Log the filtered imageSrc array
  console.log("Filtered imageSrc:", imageSrc);

  // Check if imageSrc has elements
  if (imageSrc.length > 0) {
    const imageSrcUrl = imageSrc.url || ""; // Ensure you have a valid URL property

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
  } else {
    // Handle the case where no matching weather option is found
    return (
      <section className="weather" id="weather">
        <div className="weather__info">
          {weatherTemp} {currentTemperatureUnit}
        </div>
        <div className="weather__image">
          No image available
        </div>
      </section>
    );
  }
};

export default WeatherCard;
*/
//old weather card logic
const WeatherCard = ({ weatherTemp, day, type }) => {
  const imageSrc = weatherOptions.find((item) => {
    return item.day === day && item.type === type;
  });

  if (imageSrc) {
    const imageSrcUrl = imageSrc.url || ""; // Added a check here
    return (
      <section className="weather" id="weather">
        <div className="weather__info">{weatherTemp} Fº</div>
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