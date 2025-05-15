import "./Footer.css";
import logger from "../../utils/logger";

const Footer = () => {
 logger("Footer");

  return (
    <footer className="footer">
      <div>Developed by Joshua Zimmerman</div>
      <div>© new Date().getFullYear()</div>
    </footer>
  );
};
export default Footer;
