import React from "react";
import { Link } from "react-router-dom";
import bg from "../../Pictures/logo1.png";
import arrow from "../../Pictures/arrow.png";
const ConnectSkills = () => {
  return (
    <div>
      <div className="connect-skills">
        <div className="connect-container">
          <div className="connect-card">
            <img src={bg} alt="" />
            <h1 className="image-h1"><span>Glory</span> Scout</h1>
          </div>
          <div className="connect-card">
            <div className="title">
              <h1>Connect YourSkills,</h1>
              <h1>Unlock Your Future</h1>
            </div>
            <p>
              We provide you with the tools to highlight your talent, engage
              with professionals, and take your football career
              to the next level.
            </p>
            <div className="readMore">
              <Link to="/">
                Learn more <img src={arrow} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="player-world">
        <div className="player-container"></div>
      </div>
    </div>
  );
};

export default ConnectSkills;
