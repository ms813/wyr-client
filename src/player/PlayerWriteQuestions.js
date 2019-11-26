import React from 'react';
import PlayerState from './PlayerState';

const PlayerWriteQuestions = ({onClick, setA, setB}) => {
    return (
        <div id="player-write-questions">
            <h3>Would you rather...</h3>
            <input id="inputA" type="text" onChange={e => setA(e.target.value)} />
            or
            <input id="inputB" type="text" onChange={e => setB(e.target.value)} />
            ?
            <button type="button" onClick={()=>onClick(PlayerState.WAITING_FOR_QUESTIONS)}>Submit</button>
        </div>
    );
};

export default PlayerWriteQuestions;