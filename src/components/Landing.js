import React from 'react';

const Landing = ({
                     setGameId, setPlayerName, joinGame, createGame
                 }) => (
    <div className="App">
        <div>
            <button type="button" onClick={createGame}>Create game</button>
        </div>
        <div>
            <label>
                Join Game:
                <input
                    type="text"
                    name="joinGame"
                    placeholder="Game ID"
                    onChange={(e) => setGameId(e.target.value.toLowerCase())}
                />
            </label>
            <label>
                Player Name:
                <input
                    type="text"
                    name="playerName"
                    placeholder="Player name"
                    onChange={(e) => setPlayerName(e.target.value.toLowerCase())}
                />
            </label>
            <button type="button" onClick={joinGame}>Join</button>
        </div>
    </div>
);

export default Landing;
