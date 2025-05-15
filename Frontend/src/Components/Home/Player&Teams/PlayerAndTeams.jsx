import React from 'react';
const PlayerAndTeams = () => {
    return (
        <div>
            <div className="player-teams">
                <div className="player-container">
                    <div className="title">
                        <h1>Built for all kinds of players & teams</h1>
                    </div>
                    <div className="player-cards">
                        <div className="player-card">
                            <p>For aspiring players & professionals</p>
                            <p>For clubs & scouts to discover top talents</p>
                            <p>For agents looking for the next big star</p>
                        </div>
                        <div className="player-card">
                            {/* <img src={bg} alt="" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerAndTeams;
