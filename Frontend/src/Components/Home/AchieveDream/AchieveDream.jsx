import React from 'react';
import { Link } from 'react-router-dom';
import bg from "../../Pictures/Rounlado.png"
import arrow from "../../Pictures/arrow.png"
const AchieveDream = () => {
    return (
        <div>
            <div className="achieve-dream">
                <div className="achieve-container">
                    <div className="achieve-card">
                        <div className='title'>
                        <h1>Achieve Your Dream,</h1>
                        <h1>Wherever You Are</h1>
                        </div>
                        <p>Join the Glory Scout network, where players, scouts, and clubs connect to discover talent and create real opportunities.</p>
                        <div className="readMore">
                        <Link to="/">Learn more <img  src={arrow} alt="" /> </Link>
                        </div>
                    </div>
                    <div className="achieve-card">
                        <img src={bg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AchieveDream;
