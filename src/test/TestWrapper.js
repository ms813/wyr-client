import React from 'react';
import HostGameOver from '../host/HostGameOver';

const TestWrapper = ({gameId = 'angry-goat-2'}) => {

    const players = {
        Matt: {
            name: 'Matt',
            optionA: 'tea',
            optionB: 'coffee',
            votes: {Claire: 'A', Phil: 'B'}
        },
        Claire: {
            name: 'Claire',
            optionA: 'orange',
            optionB: 'apple',
            votes: {Matt: 'B', Phil: 'A'}
        },
        Phil: {
            name: 'Phil',
            optionA: 'beard',
            optionB: 'mustache',
            votes: {Matt: 'A', Claire: 'A'}
        }
    };

    // return <HostWaitingForQuestions players={players} questions={questions}/>;
    // return <Lobby players={players} gameId={gameId} isHost />;

    const tallyVote = (aOrB, askerName, voterName) => {
        if (!players[askerName].votes) {
            players[askerName].votes = {};
        }

        players[askerName].votes[voterName] = aOrB;
    };
    const playerName = 'Claire';

    // return <HostReveal players={players} />

    return <HostGameOver />;
    // return <HostWaitingForAnswers players={players} />;

    // return <PlayerWaitingForOthers
    //     players={players}
    //     optionA={players[playerName].optionA}
    //     optionB={players[playerName].optionB}
    //     playerName={playerName}
    // />;

    // return <PlayerWriteAnswers
    //     players={players}
    //     voterName="Matt"
    //     tallyVote={tallyVote}
    //     onFinish={()=>console.log('finished')}
    // />;

};

export default TestWrapper;