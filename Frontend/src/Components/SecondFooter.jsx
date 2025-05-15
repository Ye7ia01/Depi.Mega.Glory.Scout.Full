import React from "react";
import Logo from "../assets/logo.png";
import Line from "../assets/Line.png";
import EmailIcon from "../assets/email-icon.png";
import PhoneIcon from "../assets/phone-icon.png";
import LocationIcon from "../assets/locatio-icon.png";
import { NavbarLogo } from "./NavbarLogo";
import { Link } from "react-router";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const SecondFooter = ({width, backgroundColor}) => {
  return (
    <>
      <footer className="second-footer" style={{backgroundColor: `${backgroundColor}`, width: `${width}`}}>
        <div className="contact-links">
          <NavbarLogo />
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/player"}>Players</Link>
            </li>
            <li>
              <Link to={"/coach"}>Coaches</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact us</Link>
            </li>
          </ul>

          <img src={Line} alt="line" className="w-75 mb-4 m-auto d-block" />
          <ul className="contact-info">
            <li>
              <img src={EmailIcon} alt="email icon" />
              <span className="ms-2">kareemsaad252@gmail.com</span>
            </li>
            <li>
              <img src={PhoneIcon} alt="phone icon" />
              <span className="ms-2">+20 122 671 1259</span>
            </li>

            <li>
              <img src={LocationIcon} alt="location icon" />
              <span className="ms-2">zagazig</span>
            </li>
          </ul>
          <img src={Line} alt="line" className="w-75 mb-4 m-auto d-block" />
        </div>

        <div className="copyright">

           <div className="icons-container">
            <div className="icons">
              <FaFacebook />
            </div>
            <div className="icons">
              <FaTwitter />
            </div>
            <div className="icons">
              <FaLinkedin />
            </div>
           </div>
           <span>Glory Scout All Rights Reserved</span>
           <span>Privacy Policy | Terms of Service</span>
        </div>
      </footer>
    </>
  );
};

export default SecondFooter;
