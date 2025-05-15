import React from "react";
import { Link } from "react-router-dom";
import arrow from "../../Pictures/arrow.png";
import FIFa2020 from "../../Pictures/2022.png";
import Football from "../../Pictures/Football.png";
import FIFA from "../../Pictures/fifa.png";
const GrowTitle = () => {
  return (
    <div>
      <div className="grow-title">
        <div className="grow-container">
          <div className="title">
            <h1>Built for the way you grow</h1>
          </div>
          <div className="grow-card">
            <h3>Brainstorming</h3>
            <p>
              Unlock your potential and showcase your talent with a powerful
              profile, featuring videos, stats, and
              achievements—all in one place.
            </p>
            <div className="readMore">
              <Link to="/">
                Learn more <img src={arrow} alt="" />
              </Link>
            </div>
          </div>
          <div className="logo">
            <div className="box-img">
                <img src={FIFA} alt="" />
                <img src={FIFa2020} alt="" />
            </div>
          </div>
            <div className="Football">
                <div className="img">
                <img src={Football} alt="" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GrowTitle;
