import React, {useState} from 'react';

const PlayerWriteQuestions = ({playerName, onClick, setA, setB}) => {
    return (
        <div id="player-write-questions">
            <h3>So, {playerName}. Would you rather...</h3>
            <input id="inputA" type="text" onChange={e => setA(e.target.value)} />
            or
            <input id="inputB" type="text" onChange={e => setB(e.target.value)} />
            ?
            <button type="button" onClick={onClick}>Submit</button>
        </div>
    );
};

export default PlayerWriteQuestions;