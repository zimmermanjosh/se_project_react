import ItemCard from "../ItemCard/ItemCard.js";
import WeatherCard from "../Weather/WeatherCard.js";
import { useMemo } from "react";
import "./Main.css";
import logger from "../../utils/logger.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { useContext } from "react";

function Main({ weatherTemp, onSelectedCard, cards, onCardLike }) {
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
      <WeatherCard day={true} type="cloudy" weatherTemp={tempF} />
      <section className="card__section" id="card-section">
        Today is {tempF}° {currentTemperatureUnit}/ You may want to wear:
        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectedCard={onSelectedCard}
              onCardLike={onCardLike}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;