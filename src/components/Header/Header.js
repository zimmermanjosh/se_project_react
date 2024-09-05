import "./Header.css";
import DateTime from "../DateTime/DateTime.js";
import logoImage from "../../images/dashboard/logo.svg";
import avatarImage from "../../images/dashboard/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";
import logger from "../../utils/logger.js";
import { Link } from "react-router-dom";
import { userNameProfile } from "../../utils/Constants.js";

const Header = ({ onCreateModal, location }) => {
  logger("!! Header");

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
        <div>
          <button
            type="toggle"
            onClick={onCreateModal}
            className="header__toggle_switch-button"
          ></button>
        </div>
        <div>
          <button
            type="text"
            onClick={onCreateModal}
            className="header__clothes-button"
          >
            + add clothes
          </button>
        </div>
        <Link to="/profile">
          <div className="header__name">{userNameProfile}</div>
        </Link>
        <div>
          <img src={avatarImage} alt="avatar"></img>
        </div>
      </div>
    </header>
  );
};

export default Header;
