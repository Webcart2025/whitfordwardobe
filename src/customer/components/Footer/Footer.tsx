import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faPhone,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <h3 className="footer-logo">WHITFORD</h3>
      </div>
      <div className="footer-container">
        <div className="footer-section">
          <h2>Policy</h2>
          <ul>
            <li><NavLink to="/termsandconditions">Terms & Conditions</NavLink></li>
            <li><NavLink to="/privacypolicy">Privacy Policy</NavLink></li>
            <li><NavLink to="/shippingpolicy">Shipping Policy</NavLink></li>
            <li><NavLink to="/refundpolicy">Refund Policy</NavLink></li>
            <li><NavLink to="/accessibilitystatement">Accessibility Statement</NavLink></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Follow Us</h2>
          <ul className="social-icons">
            <li>
              <button
                onClick={() => window.open("https://www.instagram.com/whitford.wardrobe/", "_blank")}
                className="icon-button"
              >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </button>
            </li>
            {/* <li>
              <button
                onClick={() => window.open("https://www.facebook.com", "_blank")}
                className="icon-button"
              >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </button>
            </li>
            <li>
              <button
                onClick={() => window.open("https://www.linkedin.com", "_blank")}
                className="icon-button"
              >
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </button>
            </li> */}
          </ul>
        </div>

        <div className="footer-section">
          <h2>Contact</h2>
          <p><FontAwesomeIcon icon={faEnvelope} /> info@whitford.in</p>
          <p><FontAwesomeIcon icon={faPhone} /> +91 6359426442</p>
          <p><FontAwesomeIcon icon={faLocationDot} /> A-602, The Capital, Science City Road, Ahmedabad, Gujarat, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 by WHITFORD</p>
      </div>
    </div>
  );
};

export default Footer;
