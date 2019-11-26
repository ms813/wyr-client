import React from 'react';
import PlayerWriteAnswers from '../player/PlayerWriteAnswers';

const TestWrapper = ({gameId = 'angry-goat-2'}) => {

    const players = {
        Matt: {
            name: 'Matt',
            optionA: 'tea',
            optionB: 'coffee'
        },
        Claire: {
            name: 'Claire',
            optionA: 'orange',
            optionB: 'apple'
        }
    };

    // return <HostWaitingForQuestions players={players} questions={questions}/>;
    // return <Lobby players={players} gameId={gameId} isHost />;

    const tallyVote = (aOrB, askerName, voterName) => {
        if(!players[askerName].votes){
            players[askerName].votes = {}
        }

        players[askerName].votes[voterName] = aOrB;

        console.log(players);
    };


    return <PlayerWriteAnswers
        players={players}
        voterName="Matt"
        tallyVote={tallyVote}
    />;

};

export default TestWrapper;