import "./itemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  console.log("ItemModal");

  return (
    <div className={"modal"}>
      <div className="modal__content">
        <button
          type="button"
          onClick={onClose}
          className="preview__close-button"
        ></button>
        <img alt={selectedCard.name} src={selectedCard.link} />
        <div className="modal__item-name"> {selectedCard.name} </div>
        <div> weather type: {selectedCard.weather} </div>
      </div>
    </div>
  );
};

export default ItemModal;
