import "./ItemCard.css";
import logger from "../../utils/logger.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

const ItemCard = ({ item, onSelectedCard, onCardLike }) => {
  logger("ItemCard");

  const currentUser = useContext(CurrentUserContext);
  if (!item || !item.imageUrl || !item.name) {
    return <div className="card__error">Invalid item data</div>;
  }

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
      <div className="card__header">
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
    </div>
  );
};

export default ItemCard;