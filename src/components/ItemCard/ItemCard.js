import "./ItemCard.css";
import logger from "../../utils/logger";

const ItemCard = ({ item, onSelectedCard }) => {
  logger("ItemCard");
  //console.log("Item data:", item); // Add this line to debug
  // Check if item is defined and has the required properties
  if (!item || !item.imageUrl || !item.name) {
    return <div className="card__error">Invalid item data</div>;
  }
  return (
    <div className="card">
      <img
        alt={item?.name}
        src={item?.imageUrl}
        className="card__image"
        onClick={() => onSelectedCard(item)}
      />
      <div className="card__name"> {item?.name}</div>
    </div>
  );
};

export default ItemCard;
