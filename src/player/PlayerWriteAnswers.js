import React from 'react';

const PlayerWriteAnswers = ({players, voterName, tallyVote}) => {

    return (
        <div>
            <p>Would you rather...</p>
            {
                Object.values(players).map(p => {
                    if (p.name === voterName) {
                        // player can't vote for their own question
                        return;
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
