import React from "react";
import { LogoImage } from "../../../API/API";
const Logo = () => {
  return (
    <div>
      <div className="logo">
        <div className="logo-container">
          <div className="logo-card">
            {LogoImage?.map((e,index) => (
              <div className="box-image" key={index}>
                <img src={e.image} alt="" />
                <h1>{e.title}</h1>
              </div>
            ))}
          </div>
          <div className="logo-card">
            {LogoImage?.map((e,index) => (
              <div className="box-image" key={index}>
                <img src={e.image} alt="" />
                <h1>{e.title}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
