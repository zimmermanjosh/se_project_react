import react from "react";
import PropTypes from "prop-types";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ cards, handleCreateModal, onSelectCard }) => {
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
        {cards.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          );
        })}
      </div>
    </div>
  );
};

// Default props for when no cards are provided (optional)
ClothesSection.defaultProps = {
  cards: [],
};

// Prop types for better type checking and documentation
ClothesSection.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // Add other item properties here if needed
    }),
  ),
  handleCreateModal: PropTypes.func.isRequired,
  onSelectCard: PropTypes.func.isRequired,
};

export default ClothesSection;
