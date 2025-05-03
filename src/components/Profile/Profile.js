import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
                   onSelectedCard,
                   onCreateModal,
                   onEditProfile,
                   onSignOut,
                   cards,
                   onCardLike
}) => {
  console.log("!!Profile");
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfile={onEditProfile}
          onSignOut={onSignOut}
        />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          cards={cards}
          onSelectedCard={onSelectedCard}
          handleCreateModal={onCreateModal}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
};

export default Profile;
