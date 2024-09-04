import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ onSelectedCard, onCreateModal, cards }) => {
  console.log("!!Profile");
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          cards={cards}
          onSelectedCard={onSelectedCard}
          handleCreateModal={onCreateModal}
        />
      </section>
    </div>
  );
};

export default Profile;
