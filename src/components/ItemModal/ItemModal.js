import "./itemModal.css";
import log from "../../utils/logger";

const ItemModal = ({ selectedCard, onClose }) => {
  log("ItemModal");

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
        <div> weather type: {selectedCard.weather} </div>
      </div>
    </div>
  );
};

export default ItemModal;
