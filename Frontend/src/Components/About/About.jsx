import React from "react";
import MissionVisionSection from "./MissionVisionSection/MissionVisionSection";
import StyleHomePage from "../../styles/StyleHomePage.module.css";
import SecondFooter from "../SecondFooter";

const About = () => {
  return (
    <div>
      <div className={`${StyleHomePage.hero} hero hero-about`}>
        <div className={`${StyleHomePage.bg} hero-bg`}>
          <div className={`${StyleHomePage.container} hero-container about-container`}>
            <div className={`${StyleHomePage.card} hero-card about-card`}>
              <div className={`${StyleHomePage.text} text`}>
                <p className="about-p">Welcome to Glory Scout</p>
                <h2>
                  <span>Where Talent Meets</span> Excellence!
                </h2>
              </div>
              <div className={`${StyleHomePage.text} text`}>
                <p>
                  At Glory Scout, we believe that football is more than just a
                  game. It’s a journey of passion, dedication, and the pursuit
                  of greatness. As a leading football academy, we are committed
                  to nurturing the next generation of football stars, providing
                  them with the tools, training, and opportunities to excel both
                  on and off the pitch. With a focus on innovation, personalized
                  coaching, and unwavering commitment, we strive to create an
                  environment where young athletes can thrive and achieve their
                  dreams. Whether you're an aspiring player or a passionate
                  supporter, join us on this exciting journey and experience a
                  new level of football excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MissionVisionSection />
      <SecondFooter width={'90%'} backgroundColor={'#000000'}/>
    </div>
  );
};

export default About;
