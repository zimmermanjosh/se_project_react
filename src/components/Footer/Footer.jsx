import "./Footer.css";
import logger from "../../utils/logger.jsx";

let date = new Date().getFullYear()


const Footer = () => {
 logger("Footer");

  return (
    <footer className="footer">
      <div>Developed by Joshua Zimmerman</div>
      <div>© {date}</div>
    </footer>
  );
};
export default Footer;
