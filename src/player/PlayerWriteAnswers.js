import React from 'react';
import PlayerState from './PlayerState';

const PlayerWriteAnswers = ({players, voterName, tallyVote, setVoterState}) => {

    const answerCount = Object.values(players).reduce((acc, next) => {
        if (next.name !== voterName && next.votes && next.votes[voterName]) {
            acc--;
        }
        return acc;
    }, Object.keys(players).length - 1);

    if (answerCount === 0) {
        setVoterState(PlayerState.WAITING_FOR_OTHER_PLAYERS);
    }

    return (
        <div>
            <p>{voterName}, would you rather...</p>
            {
                Object.values(players).map(p => {
                    if (p.name === voterName) {
                        // player can't vote for their own question
                        return null;
                    }
                    const radioName = `${p.name}-question`;
                    return <div key={p.name}>
                        <input type="radio" name={radioName}
                               onChange={() => tallyVote('A', p.name, voterName)} />{p.optionA}&nbsp;
                        or
                        <input type="radio" name={radioName}
                               onChange={() => tallyVote('B', p.name, voterName)} /> {p.optionB}
                    </div>;
                })
            }
        </div>
    );
};

export default PlayerWriteAnswers;
