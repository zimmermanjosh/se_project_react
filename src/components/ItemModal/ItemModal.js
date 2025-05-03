import "./itemModal.css";
import logger from "../../utils/logger";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, onCardDelete }) => {
  logger("ItemModal");

  const currentUser = useContext(CurrentUserContext);

  // current user is the owner of the item
  const isOwn = selectedCard.owner === currentUser?._id;

  // delete button visibility
  const deleteButtonClassName = `delete__button ${isOwn ? "delete__button_visible" : "delete__button_hidden"}`;

  return (
    <div className={"modal"}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="preview__close-button"
        ></button>
        <img
          className="modal__image"
          alt={selectedCard.name}
          src={selectedCard.imageUrl}
        />
        <div className="modal__item-name"> {selectedCard.name} </div>
        <div className="modal__item-info">
          Weather type: {selectedCard.weather}
          <button
            className={deleteButtonClassName}
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
