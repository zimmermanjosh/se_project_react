import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ onSelectCard, onCreateModal, cards }) => {
  console.log("!!Profile");
  return (
    /*<div className="profile">
      <div className="profile__sidebar">
        <SideBar />
      </div>

      <ClothesSection
        cards={cards}
        onSelectCard={onSelectCard}
        handleCreateModal={onCreateModal}
      />
    </div>*/
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          cards={cards}
          onSelectCard={onSelectCard}
          handleCreateModal={onCreateModal}
        />
      </section>
    </div>
  );
};

export default Profile;
