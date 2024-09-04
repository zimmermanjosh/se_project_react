import React, { useState } from "react";
import ModalWithForm from "../components/ModalWithForm/ModalWithForm.js";
//import log from "../utils/logger.js";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.PreventDefault();
    onAddItem({ name, imageUrl: link, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="modal__overlay">
        <label className="modal__input-label">
          {" "}
          <input
            className="modal__input"
            type="text"
            minLength={1}
            maxLength={23}
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
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
            //onChange={(input) => handleOnChange(input.target.value)}
            value={link}
            onChange={handleUrlChange}
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
              onChange={handleWeatherChange}
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
              onChange={handleWeatherChange}
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
              onChange={handleWeatherChange}
            />
            <label> cold </label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
