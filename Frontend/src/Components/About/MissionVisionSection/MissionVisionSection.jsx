import React from "react";
import { MissionVision } from "../../../API/API";
const MissionVisionSection = () => {
  return (
    <div>
      <div className="mission-vision">
        <div className="title-page">
          <h1>Mission & Vision</h1>
          <p>
            We envision being a leading force in the world of football, driven
            by passion, innovation, and inclusivity, creating a brighter future
            for young athletes while maintaining a strong commitment to
            excellence, integrity, and community development.
          </p>
        </div>
        <div className="mission-container">
          {MissionVision?.map((e, index) => (
            <div key={index} className="mission-cards">
              {e.image && (
                <div className="mission-card">
                  <img src={e.image} alt="" />
                </div>
              )}
              {(e.title || e.description) && (
                <div className="mission-card">
                  {e.title && <h1>{e.title}</h1>}
                  {e.description && <p>{e.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="player-world">
        <div className="player-container"></div>
      </div>
    </div>
  );
};

export default MissionVisionSection;
