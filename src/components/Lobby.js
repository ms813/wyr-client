import React from 'react';
import PropTypes from 'prop-types';
import HostState from '../host/HostState';

const Lobby = ({gameId, players, isHost, onClick}) => {
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
        {
            isHost &&
            <button type="button" onClick={() => onClick(HostState.WAITING_FOR_QUESTIONS)}>
                Start
            </button>
        }
    </div>;
};

Lobby.propTypes = {
    gameId: PropTypes.string,
    players: PropTypes.object,
    isHost: PropTypes.bool
};

export default Lobby;