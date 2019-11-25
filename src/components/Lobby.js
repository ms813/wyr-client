import React from 'react';
import PropTypes from 'prop-types';

const Lobby = ({gameId, players, isHost}) => {
console.log(players);
    return <div>
        <h1>You are in the lobby for {gameId}</h1>
        {players ?
            <ul>
                {Object.entries(players).map(
                    ([id, name]) => <li key={id}>{name}</li>
                )}
            </ul>
            : `Waiting on players to join`
        }
        {isHost && <button type="button">Start</button>}
    </div>;
};

Lobby.propTypes = {
    gameId: PropTypes.string,
    players: PropTypes.object,
    isHost: PropTypes.bool
};

export default Lobby;