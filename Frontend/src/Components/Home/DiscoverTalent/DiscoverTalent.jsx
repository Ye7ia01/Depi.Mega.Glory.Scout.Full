import React from "react";
import { Talent } from "../../../API/API";
const DiscoverTalent = () => {
  return (
    <div>
      <div className="discover-talent">
        <div className="discover-container">
          <div className="title">
            <h1>Discover Talent</h1>
            <h1>Without Limits</h1>
            <p>YOUR IDEA STARTS HERE</p>
          </div>
          <div className="discover-cards">
            {Talent?.map((e, index) => (
              <div className="discover-card" key={index}>
                <h1>{e.title}</h1>
                {e.image && (
                  <div className="image">
                    <img src={e.image} alt="" />
                  </div>
                )}
                <h3>{e.descrption}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverTalent;
