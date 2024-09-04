import "./Footer.css";
import logger from "../../utils/logger";

const Footer = () => {
 logger("Footer");

  return (
    <footer className="footer">
      <div>Developed by Joshua Zimmerman</div>
      <div>© 2024</div>
    </footer>
  );
};
export default Footer;
