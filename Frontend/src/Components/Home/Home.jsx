import React, {useContext, useEffect} from "react";
import Logo from "./Logo/Logo";
import DiscoverTalent from "./DiscoverTalent/DiscoverTalent";
import AchieveDream from "./AchieveDream/AchieveDream";
import ConnectSkills from "./ConnectSkills/ConnectSkills";
import GrowTitle from "./GrowTitle/GrowTitle";
import PlayerAndTeams from "./Player&Teams/PlayerAndTeams";
import StartFootball from "./StartFootball/StartFootball";
import LiveStore from "./LiveStore/LiveStore";
import StyleHomePage from "../../styles/StyleHomePage.module.css";
import { useNavigate } from "react-router";

import {AuthContext} from "../../context/AuthContext.jsx";
const Home = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.token)
        {
            navigate("/home")
        }

    }, [user]);

  return (
    <div>
      <div className="Home-Page">
      <div className={`${StyleHomePage.hero} hero`}>
        <div className={`${StyleHomePage.bg} hero-bg`}>
          <div className={`${StyleHomePage.container} hero-container`}>
            <div className={`${StyleHomePage.card} hero-card`}>
              <div className={`${StyleHomePage.text} text`}>
                <p>Welcome to Glory Scout</p>
                <h2>Turn Your Dream into Reality! </h2>
              </div>
              <div className={`${StyleHomePage.text} text`}>
                <h1>Join Glory Scout</h1>
                <h4>
                  where rising stars meet real opportunities in the football
                  world. Create your profile,{" "}
                </h4>
                <h4>
                  showcase your skills, and take the first step toward your
                  professional career today!
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Here For Section Logo */}
      <Logo />
      <DiscoverTalent />
      <AchieveDream />
      <ConnectSkills />
      <GrowTitle />
      <PlayerAndTeams />
      <LiveStore />
      <StartFootball />
      </div>
    </div>
  );
};

export default Home;
