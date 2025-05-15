import ItemCard from "../ItemCard/ItemCard.jsx";
import WeatherCard from "../Weather/WeatherCard.jsx";
import { useMemo } from "react";
import "./Main.css";
import logger from "../../utils/logger.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { useContext } from "react";

function Main({ weatherTemp, onSelectedCard, cards, onCardLike, isLoggedIn }) {
  console.log("weatherTemp in Main:", weatherTemp);
  logger("Main");
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  logger(currentTemperatureUnit);
  const tempF = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  const weatherType = useMemo(() => {
    if (tempF >= 86) {
      return "hot";
    } else if (tempF >= 66 && tempF <= 85) {
      return "warm";
    } else if (tempF <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  logger(weatherType);

  const filteredCards = cards.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  logger(filteredCards);

  return (
    <main className="main">
      {weatherTemp ? (
      <WeatherCard day={true} type="cloudy" weatherTemp={tempF} />
      ) : (
        <div className="weather-placeholder">
          {isLoggedIn ? "Loading weather data..." : "Log in to see the weather"}
        </div>
      )}
      <section className="card__section" id="card-section">
        {weatherTemp ? (
          <>
        Today is {tempF}° {currentTemperatureUnit}/ You may want to wear:
            <div className="card__items">
              {filteredCards.length > 0 ? (
                filteredCards.map((item) => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onSelectedCard={onSelectedCard}
                    onCardLike={onCardLike}
                  />
            ))
            ) : (
            <p>No items found for this weather</p>
            )}
        </div>
          </>
        ) : (
          <p>{isLoggedIn ? "Loading items..." : "Log in to see clothing recommendations"}</p>
        )}
      </section>
    </main>
  );
}

export default Main;