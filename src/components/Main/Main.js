/*import ItemCard from "../ItemCard/ItemCard.js";
import WeatherCard from "../Weather/WeatherCard.js";
import { defaultClothingItems, weatherOptions } from "../../utils/Constants.js";
import { useMemo, useContext } from "react";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({ weatherTemp, onSelectedCard }) {

  const { currentTemperatureUnit  } = useContext(CurrentTemperatureUnitContext);
  console.log("Current Temperature Unit:", currentTemperatureUnit);
  console.log("Weather Temperature Object:", weatherTemp);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 899;
  console.log("Temperature:", temp);
  const weatherType = useMemo(() => {
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    } else {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }
  }, [temp]);

  //console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  //console.log(filteredCards);

  return (
    <main className="main">
      <WeatherCard day={false} type="sunny" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp} Fº/ You may want to wear:
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
*/

//old code 
import ItemCard from "../ItemCard/ItemCard.js";
import WeatherCard from "../Weather/WeatherCard.js";
import { defaultClothingItems, weatherOptions } from "../../utils/Constants.js";
import { useMemo } from "react";
import "./Main.css";

function Main({ weatherTemp, onSelectedCard }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return "hot";
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return "warm";
    } else if (weatherTemp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  console.log(filteredCards);

  return (
    <main className="main">
      <WeatherCard day={false} type="rain" weatherTemp={weatherTemp} />
      <section className="card__section" id="card-section">
        Today is {weatherTemp} Fº/ You may want to wear:
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
