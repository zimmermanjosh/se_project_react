import "./ItemCard.css";
import log from "../../utils/logger";

const ItemCard = ({ item, onSelectedCard }) => {
  log("ItemCard");
  return (
    <div>
      <div id="img-div" className="card">
        <img
          src={item.link}
          alt={item.name}
          className="card__image"
          onClick={() => onSelectedCard(item)}
        />
        <div className="card__name"> {item.name}</div>
      </div>
    </div>
  );
};

export default ItemCard;
