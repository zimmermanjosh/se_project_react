import "./App.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Main from "../Main/Main.js";
import { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal.js";
import {
  getForecastWeather,
  parseWeatherData,
} from "../../utils/WeatherApi.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../../AddItemModal/AddItemModal.js";
import log from "../../utils/logger.js";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.js";
import { deleteItems, addItems, getItems } from "../../utils/api.js";

function App() {
  log("App");

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cards, setCards] = useState([]);

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

  const handleDeleteModal = (card) => {
    deleteItems(card._id)
      .then(() => {
        handleCloseModal();
        const updatedCards = cards.filter((item) => item._id !== card._id);
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const onAddItem = (values) => {
    addItems(values)
      .then((res) => {
        setCards((cards) => [res, ...cards]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
    console.log("onAddItem", values);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        log(temperature);
        setTemp(temperature);

        // Fetch items after setting temperature
        return getItems();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Invalid item data");
        }
        setCards(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  log(temp);
  log(currentTemperatureUnit);

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherTemp={temp}
                onSelectedCard={handleSelectedCard}
                cards={cards}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                onSelectedCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                cards={cards}
              />
            }
          />
        </Routes>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            onCardDelete={handleDeleteModal}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
