import React from 'react';

const PlayerWaitingForOthers = ({optionA, optionB, players, playerName}) => {

    const createAnswer = ({votes, optionA, optionB}) => {

        let rather;
        let than;
        if (votes[playerName] === 'A') {
            rather = optionA;
            than = optionB;
        } else {
            rather = optionB;
            than = optionA;
        }
        return <div>{rather} than {than}</div>;
    };

    return (
        <div>
            <div>{playerName} is waiting on everyone else to finish</div>
            {
                optionA && optionB &&
                <div>
                    <h2>You asked:</h2>
                    <p>Would you rather <b>{optionA}</b> or <b>{optionB}?</b></p>
                </div>
            }
            {
                players &&
                Object.values(players).filter(p => p.votes && p.votes[playerName]).length > 0 &&
                <div>
                    <h2>You would rather:</h2>
                    {Object.values(players).map(player => {
                        if (player.name !== playerName) {
                            return createAnswer(player);
                        }
                    })}
                </div>
            }
        </div>
    );
};
export default PlayerWaitingForOthers;