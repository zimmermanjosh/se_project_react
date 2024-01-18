import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "add garment",
  title,
  onclose,
  name,
}) => {
  console.log("ModalWithForm");

  return (
    <div>
      <div className={`modal modal_type_${name}`} />
      <div className="modal__content">
        <button type="button" onClick={onclose}>
          {" "}
        </button>
        <h3>{title}</h3>
        <form>{children}</form>
        <button type="submit" onClick={() => console.log("Clicked_Submit")}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default ModalWithForm;