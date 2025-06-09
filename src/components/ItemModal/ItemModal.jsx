import "./itemModal.css";
import logger from "../../utils/logger.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

const ItemModal = ({ selectedCard, onClose, onCardDelete, isLoggedIn }) => {
  logger("ItemModal");

  const currentUser = useContext(CurrentUserContext);

  // Simplified ownership check
  const isOwn = selectedCard.owner === currentUser?._id || !selectedCard.owner;
  const showDeleteButton = isLoggedIn && isOwn;

  return (
    <div className="modal">
      <div className="modal__content">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="preview__close-button"
        ></button>

        {/* Big image taking up most of the modal */}
        <div className="modal__image-container">
          <img
            className="modal__image"
            alt={selectedCard.name}
            src={selectedCard.imageUrl}
          />
        </div>

        {/* Bottom section exactly like Figma */}
        <div className="modal__footer">
          <div className="modal__info">
            <p className="modal__item-name">{selectedCard.name}</p>
            <p className="modal__weather-type">Weather: {selectedCard.weather}</p>
          </div>

          {showDeleteButton && (
            <button
              className="modal__delete-button"
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