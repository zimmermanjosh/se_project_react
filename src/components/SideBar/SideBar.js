import Avatar from "../../images/dashboard/avatar.svg";
import "../SideBar/SideBar.css";
import { userNameProfile } from "../../utils/Constants.js";

const SideBar = () => {
  console.log("!!SideBar");
  return (
    <div className="sidebar">
      {/* <div className="sidebar__info"> */}
      <img src={Avatar} className="sidebar__image" alt="sidebar-avatar" />
      <div>
        <p className="sidebar__name">{userNameProfile}</p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SideBar;
