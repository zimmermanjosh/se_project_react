import "./itemModal.css";
import logger from "../../utils/logger.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

const ItemModal = ({ selectedCard, onClose, onCardDelete, isLoggedIn, onCardLike }) => {
  logger("ItemModal");

  const currentUser = useContext(CurrentUserContext);

  // current user is the owner of the item
  // More forgiving check
  const isOwn = selectedCard.owner === currentUser?._id || !selectedCard.owner;

  const canDelete = isLoggedIn && isOwn;

  // delete button visibility
  const deleteButtonClassName = `delete__button ${canDelete ? "delete__button_visible" : "delete__button_hidden"}`;


  const isLiked = selectedCard.likes && currentUser
    ? selectedCard.likes.some(id => id === currentUser._id)
    : false;

  // like button click
  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent modal from closing
    onCardLike({ id: selectedCard._id, isLiked: !isLiked });
  };
  return (
    <div className="modal">
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="preview__close-button"
        ></button>

        {/* Header with name and like button */}
        <div className="modal__header">
          <h3 className="modal__item-name">{selectedCard.name}</h3>

          {currentUser && (
            <button
              type="button"
              className={`card__like-button ${isLiked ? "card__like-button_active" : ""}`}
              onClick={handleLikeClick}
            >
              ♥
            </button>
          )}
        </div>

        {/* Image container */}
        <div className="modal__image-container">
          <img
            className="modal__image"
            alt={selectedCard.name}
            src={selectedCard.imageUrl}
          />
        </div>

        {/* Weather info and delete button */}
        <div className="modal__footer">
          <p className="modal__weather-type">Weather type: {selectedCard.weather}</p>

          {isLoggedIn && isOwn && (
            <button
              className="delete__button"
              onClick={() => onCardDelete(selectedCard)}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ItemModal;
