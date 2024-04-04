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
function App() {
  const weatherTemp = "87°F";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [image, setImage] = useState("");

  const handleOnChange = (imageValue) => {
    console.log("imageValue", imageValue);
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

  console.log(selectedCard);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        console.log(temperature);
        setTemp(temperature);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);
  console.log(temp);

  //const currentLocation = { Location };
  return (
    <div>
      <Header onCreateModal={handleCreateModal} temp={temp} />
      <Main weatherTemp={temp} onSelectedCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm
          title="New Garment"
          buttonText="Add Garment"
          onClose={handleCloseModal}
        >
          <div className="modal__overlay">
            <label className="modal__input-label">
              <input
                className="modal__input"
                type="text"
                minLength={1}
                maxLength={23}
                name="name"
                placeholder="Name"
              />
            </label>
            <label className="modal__input-label">
              image
              <input
                className="modal__input"
                minLength={1}
                type="url"
                name="link"
                placeholder="Image URL"
                onChange={(input) => handleOnChange(input.target.value)}
              />
            </label>
            <p>Select the weather type</p>
            <div className="weather_selector">
              <div className="modal__buttons">
                <input
                  className="input__button"
                  type="radio"
                  name="weather"
                  id="hot"
                  value="hot"
                />
                <label> hot </label>
              </div>
              <div>
                <input
                  className="input__button"
                  type="radio"
                  id="warm"
                  value="warm"
                  name="weather"
                />
                <label> warm </label>
              </div>
              <div>
                <input
                  className="input__button"
                  type="radio"
                  name="weather"
                  id="cold"
                  value="cold"
                />
                <label> cold </label>
              </div>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
