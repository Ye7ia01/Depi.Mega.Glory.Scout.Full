import React from 'react';
import { Link } from 'react-router-dom';

const StartFootball = () => {
    return (
        <div>
            <div className="start-football">
                    <div className="right"></div>
                    <div className="left"></div>
                <div className="start-container">
                    <div className="text">
                        <h1>Start Your <span>Football Journey Today</span></h1>
                        <p>Your dream football career is just a click away. Whether you're a player looking to showcase your skills, a coach searching for talent, or a club aiming to discover the next star, GloryScout is here to assist you every step of the way. Take the first step towards your football goals and explore our platform or get in touch with our team for personalized assistance.</p>
                    </div>
                    <div className="btn">
                        <Link>Explore Properties</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StartFootball;
