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

const Footer = () => {
  return (
    <footer className="bg-black border-t">
      <div className="max-w-screen-xl mx-auto p-6 md:py-10 grid md:grid-cols-4 gap-8 text-white">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">WHITFORD</h3>
          <p className="text-sm">
            Elevating wardrobe experiences with premium products.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase">Policy</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/termsandconditions" className="hover:underline">
                Terms & Conditions
              </NavLink>
            </li>
            <li>
              <NavLink to="/privacypolicy" className="hover:underline">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/shippingpolicy" className="hover:underline">
                Shipping Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/refundpolicy" className="hover:underline">
                Refund Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="/accessibilitystatement" className="hover:underline">
                Accessibility Statement
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase">Follow Us</h4>
          <div className="flex space-x-4 text-lg">
            <a
              href="https://www.instagram.com/whitford.wardrobe/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            {/* <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a> */}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              info@whitford.in
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              +91 6359426442
            </li>
            <li>
              <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
              A-602, The Capital, Science City Road, Ahmedabad
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-white py-4 border-t border-gray-700">
        © {new Date().getFullYear()} WHITFORD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
