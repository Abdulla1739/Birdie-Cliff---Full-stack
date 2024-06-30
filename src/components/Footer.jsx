import { LocationOn, LocalPhone, Email } from "@mui/icons-material";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <Link
          style={{ textDecoration: "none", color: "white", fontSize: "larger" }}
          to={"/"}
        >
          Birdie Cliff.
        </Link>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+91 6577776564</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>birdiecliff@support.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
