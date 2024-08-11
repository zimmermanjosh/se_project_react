import ItemCard from "../ItemCard/ItemCard.js";
import WeatherCard from "../Weather/WeatherCard.js";
import { defaultClothingItems, weatherOptions } from "../../utils/Constants.js";
import { useMemo } from "react";
import "./Main.css";
import { tempCompareValues } from "../../utils/Constants.js";

function Main({ weatherTemp, onSelectedCard}) {
 const weatherType = useMemo(() => {
  if (weatherTemp >= tempCompareValues.hot) {
    return "hot";
  } else if (weatherTemp >= tempCompareValues.cold && weatherTemp <= tempCompareValues.hot) {
    return "warm";
  } else if (weatherTemp <= tempCompareValues.cold) {
    return "cold";
  }
}, [weatherTemp]);

  //console.log(weatherType);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  //console.log(filteredCards);

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
