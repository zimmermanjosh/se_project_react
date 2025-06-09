import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import "../SideBar/SideBar.css";

const SideBar = ({ onEditProfile, onSignOut }) => {
  console.log("!!SideBar");

  const currentUser = useContext(CurrentUserContext);

  // Create a function to render the avatar or first letter placeholder
  const renderAvatar = () => {
    return currentUser?.avatar ? (
      <img src={currentUser.avatar} className="sidebar__avatar" alt="user avatar" />
    ) : (
      <div className="sidebar__avatar-placeholder">
        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : ""}
      </div>
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__info">
        {renderAvatar()}
        <div className="sidebar__user-info">
          <p className="sidebar__name">{currentUser?.name}</p>
          <button
            className="sidebar__edit-button"
            type="button"
            onClick={onEditProfile}
          >
            Change profile data
          </button>
          <button
            className="sidebar__logout-button"
            type="button"
            onClick={onSignOut}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;