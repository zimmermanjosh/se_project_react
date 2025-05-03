import ItemCard from "../ItemCard/ItemCard";
import "../ClothesSection/ClothesSection.css";

const ClothesSection = ({ cards, handleCreateModal, onSelectedCard, onCardLike }) => {
  console.log("!!ClothersSection");
  return (
    <div className="clothes__section">
      <div className="clothes__border">
        <p className="clothes__title">Your items</p>
        <button
          className="clothes__button"
          onClick={handleCreateModal}
          type="text"
        >
          + Add New
        </button>
      </div>
      <div className="clothes__items">
        {cards.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onSelectedCard={onSelectedCard}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;