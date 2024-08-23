import "./App.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Main from "../Main/Main.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal.js";
import {
  getForecastWeather,
  parseWeatherData,
} from "../../utils/WeatherApi.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../../AddItemModal/AddItemModal.js";
import version from "../../version.js";
import log from "../../utils/logger.js";

function App() {
  console.log("App");

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [setImage] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleOnChange = (imageValue) => {
    log("imageValue", imageValue);
    setImage(imageValue);
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  log(selectedCard);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const onAddItem = (event) => {
    console.log(event);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        log(temperature);
        setTemp(temperature);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

    console.log(`App Version: ${version}`); // Log the version number to the console
  }, []);

  log(temp);
  console.log(currentTemperatureUnit);

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Main weatherTemp={temp} onSelectedCard={handleSelectedCard} />
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
