import React from 'react';
import HostWaitingForAnswers from '../host/HostWaitingForAnswers';
import PlayerWriteAnswers from '../player/PlayerWriteAnswers';

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
            optionA: 'really long thin willy that can wrap around the earth 40 times',
            optionB: 'red pepper soup, chilli prawns and maltesers all in one pot',
            votes: {Matt: 'A', Claire: 'A'}
        }
    };

    const playerName = 'Claire';

    const tallyVote = (aOrB, askerName, voterName) => {
        if (!players[askerName].votes) {
            players[askerName].votes = {};
        }

        players[askerName].votes[voterName] = aOrB;
    };

    // return <HostWaitingForQuestions players={players} questions={questions}/>;
    // return <Lobby players={players} gameId={gameId} isHost onClick={()=>console.log("host lobby click")} />;
    // return <PlayerWriteQuestions updatePlayerState={console.log} setA={console.log} setB={console.log} playerName={playerName}/>;
    // return <HostReveal players={players} />;

    // return <CreateOrJoinForm
    //     setGameId={gameId => console.log('set game Id', gameId)}
    //     setPlayerName={name => console.log('set player name', name)}
    //     joinGame={() => console.log('join')}
    //     createGame={() => console.log('create')}
    //     playerNameError={"player name error"}
    //     gameIdError={"game Id error"}
    // />;
    // return <HostWaitingForAnswers players={players} setHostState={console.log}/>;

    // return <PlayerWaitingForOthers
    //     players={players}
    //     optionA={players[playerName].optionA}
    //     optionB={players[playerName].optionB}
    //     playerName={playerName}
    // />;

    return <PlayerWriteAnswers
        players={players}
        voterName="Matt"
        tallyVote={tallyVote}
        setVoterState={()=>console.log('finished')}
    />;

};

export default TestWrapper;