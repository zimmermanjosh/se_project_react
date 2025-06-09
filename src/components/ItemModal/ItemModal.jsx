import "./itemModal.css";
import logger from "../../utils/logger.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

const ItemModal = ({ selectedCard, onClose, onCardDelete, isLoggedIn }) => {
  logger("ItemModal");

  const currentUser = useContext(CurrentUserContext);

  // current user is the owner of the item
  const isOwn = selectedCard.owner === currentUser?._id || !selectedCard.owner;
  const canDelete = isLoggedIn && isOwn;

  return (
    <div className="modal">
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="preview__close-button"
        ></button>

        {/* Image container - bigger in upper half */}
        <div className="modal__image-container">
          <img
            className="modal__image"
            alt={selectedCard.name}
            src={selectedCard.imageUrl}
          />
        </div>

        {/* Bottom section with name, weather, and delete button */}
        <div className="modal__footer">
          <div className="modal__info">
            <p className="modal__item-name">{selectedCard.name}</p>
            <p className="modal__weather-type">Weather: {selectedCard.weather}</p>
          </div>

          {canDelete && (
            <button
              className="delete__button"
              onClick={() => onCardDelete(selectedCard)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;