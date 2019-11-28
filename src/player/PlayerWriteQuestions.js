import React from 'react';
import PlayerState from './PlayerState';

const PlayerWriteQuestions = ({updatePlayerState, setA, setB, playerName}) => {
    return (
        <div id="player-write-questions">
            <h3><b>{playerName}</b>, ask others if they would rather...</h3>
            <input id="inputA" type="text" onChange={e => setA(e.target.value)} />
            or
            <input id="inputB" type="text" onChange={e => setB(e.target.value)} />
            ?
            <button type="button" onClick={() => updatePlayerState(PlayerState.WAITING_FOR_OTHER_PLAYERS)}>Submit</button>
        </div>
    );
};

export default PlayerWriteQuestions;