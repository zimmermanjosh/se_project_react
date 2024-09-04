import "./itemModal.css";
import logger from "../../utils/logger";

const ItemModal = ({ selectedCard, onClose, onCardDelete }) => {
  logger("ItemModal");

  return (
    <div className={"modal"}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="preview__close-button"
        ></button>
        <img alt={selectedCard.name} src={selectedCard.imageUrl} />
        <div className="modal__item-name"> {selectedCard.name} </div>
        <div>
          {" "}
          weather type: {selectedCard.weather}
          <button
            className="delete__button"
            onClick={() => onCardDelete(selectedCard)}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
