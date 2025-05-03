import "./ItemCard.css";
import logger from "../../utils/logger";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectedCard, onCardLike }) => {
  logger("ItemCard");

  const currentUser = useContext(CurrentUserContext);

  // Check if item is defined and has the required properties
  if (!item || !item.imageUrl || !item.name) {
    return <div className="card__error">Invalid item data</div>;
  }

  // Check if the current user has liked this item
  const isLiked = item.likes && currentUser
    ? item.likes.some(id => id === currentUser._id)
    : false;

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked: !isLiked });
  };

  return (
    <div className="card">
      <img
        alt={item.name}
        src={item.imageUrl}
        className="card__image"
        onClick={() => onSelectedCard(item)}
      />
      <div className="card__name">{item.name}</div>
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
  );
};

export default ItemCard;