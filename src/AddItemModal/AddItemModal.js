import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import log from "../../utils/logger.js";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      onClose={handleCloseModal}
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
  );
};

export default AddItemModal;
