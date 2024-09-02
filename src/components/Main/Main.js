import ItemCard from "../ItemCard/ItemCard.js";
import WeatherCard from "../Weather/WeatherCard.js";
//import { defaultClothingItems } from "../../utils/Constants.js";
import { useMemo } from "react";
import "./Main.css";
import log from "../../utils/logger.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { useContext } from "react";

function Main({ weatherTemp, onSelectedCard, cards }) {
  log("Main");
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  log(currentTemperatureUnit);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  const weatherType = useMemo(() => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    } else {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }
  }, [weatherTemp]);

  log(weatherType);

  const filteredCards = cards.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  /*defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });*/

  log(filteredCards);

  return (
    // invoke weather card component with day=true and type="cloudy"
    <main className="main">
      <WeatherCard day={true} type="cloudy" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp} {currentTemperatureUnit}/ You may want to wear:
        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onSelectedCard={onSelectedCard}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
