import Avatar from "../../images/dashboard/avatar.svg"
import "../SideBar/SideBar.css";

const SideBar = () => {
  return (
    <div className="sidebar">
      {/* <div className="sidebar__info"> */}
      <img src={Avatar} className="sidebar__image" alt="sidebar-avatar" />
      <div>
        <p className="sidebar__name">User</p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SideBar;
