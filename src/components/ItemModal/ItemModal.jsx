import "./itemModal.css";
import logger from "../../utils/logger.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

const ItemModal = ({ selectedCard, onClose, onCardDelete, isLoggedIn }) => {
  logger("ItemModal");
  const currentUser = useContext(CurrentUserContext);

  console.log("🔍 DELETE BUTTON DEBUG:");
  console.log("- isLoggedIn:", isLoggedIn);
  console.log("- currentUser:", currentUser);
  console.log("- selectedCard.owner:", selectedCard.owner);
  console.log("- currentUser?._id:", currentUser?._id);

  const isOwn = selectedCard.owner === currentUser?._id || !selectedCard.owner;
  console.log("- isOwn calculation:", isOwn);

  const showDeleteButton = isLoggedIn && isOwn;
  console.log("- FINAL showDeleteButton:", showDeleteButton);

  return (
    <div className="modal">
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="preview__close-button"
        ></button>

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