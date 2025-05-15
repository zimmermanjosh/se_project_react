import "./Header.css";
import DateTime from "../DateTime/DateTime.js";
import logoImage from "../../images/dashboard/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import logger from "../../utils/logger.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({
                  onCreateModal,
                  onRegisterModal,
                  onLoginModal,
                  isLoggedIn,
                  location
                }) => {
  logger("!! Header");

  const currentUser = useContext(CurrentUserContext);

  // Create a function to render the avatar or first letter placeholder
  const renderAvatar = () => {
    return currentUser?.avatar ? (
      <img src={currentUser.avatar} alt="avatar" className="header__avatar" />
    ) : (
      <div className="header__avatar-placeholder">
        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : ""}
      </div>
    );
  };

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logoImage} alt="logo"></img>
          </Link>
        </div>
        <div>
          <DateTime />
        </div>
        <div className="header__location">{location}</div>
      </div>

      <div className="header__avatar-logo">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <div>
              <button
                type="text"
                onClick={onCreateModal}
                className="header__button"
              >
                + Add clothes
              </button>
            </div>
            <Link to="/profile" className="header__profile-link">
              <div className="header__name">{currentUser?.name}</div>
              {renderAvatar()}
            </Link>
          </>
        ) : (
          <>
            <button
              type="text"
              onClick={onRegisterModal}
              className="header__button"
            >
              Sign Up
            </button>
            <button
              type="text"
              onClick={onLoginModal}
              className="header__button"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;