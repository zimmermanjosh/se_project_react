import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ onSelectCard, onCreateModal, cards }) => {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar />
      </div>

      <ClothesSection
        cards={cards}
        onSelectCard={onSelectCard}
        handleCreateModal={onCreateModal}
      />
    </div>
  );
};

export default Profile;
