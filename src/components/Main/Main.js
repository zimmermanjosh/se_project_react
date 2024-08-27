import ItemCard from "../ItemCard/ItemCard.js";
import WeatherCard from "../Weather/WeatherCard.js";
import { defaultClothingItems } from "../../utils/Constants.js";
import { useMemo } from "react";
import "./Main.css";
import log  from "../../utils/logger.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({ weatherTemp, onSelectedCard }) {
  console.log("Main");
  const { currentTemperatureUnit  } = useContext(CurrentTemperatureUnitContext);
  console.log(currentTemperatureUnit);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999
  
  const weatherType = useMemo(() => {
    
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  log(weatherType);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  log(filteredCards);

  return (
    // invoke weather card component with day=true and type="cloudy"
    <main className="main">
      <WeatherCard day={true} type="cloudy" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp} º/ You may want to wear:
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
