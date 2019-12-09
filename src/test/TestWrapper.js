import React from 'react';
import PlayerWriteAnswers from '../player/PlayerWriteAnswers';
import HostReveal from '../host/HostReveal';
import HostGameOver from '../host/HostGameOver';
import PlayerGameOver from '../player/PlayerGameOver';
import PlayerWaitingForOthers from '../player/PlayerWaitingForOthers';
import HostWaitingForQuestions from '../host/HostWaitingForQuestions';
import HostWaitingForAnswers from '../host/HostWaitingForAnswers';
import HostLobby from '../host/HostLobby';
import PlayerLobby from '../player/PlayerLobby';

const TestWrapper = ({gameId = 'angry-goat-2'}) => {


    const players = {
        Phil: {
            name: 'Phil',
            optionA: 'medium line that is between',
            optionB: 'thirty four and seventy chars this',
            votes: {Matt: 'A', Claire: 'A'}
        },
        Matt: {
            name: 'Matt',
            optionA: 'tea',
            optionB: 'coffee',
            votes: {Claire: 'A', Phil: 'B'}
        },
        Claire: {
            name: 'Claire',
            optionA: 'really really really long line that is longer',
            optionB: 'than 64 chars so needs a full line for each option',
            votes: {Matt: 'B', Phil: 'A'}
        }
    };

    const playerName = 'Claire';

    const tallyVote = (aOrB, askerName, voterName) => {
        if (!players[askerName].votes) {
            players[askerName].votes = {};
        }

        players[askerName].votes[voterName] = aOrB;
    };

    // return <HostWaitingForQuestions players={players} />;
    // return <HostLobby players={players} gameId={gameId} onClick={()=>console.log("host lobby click")} />;
    // return <PlayerLobby players={players} gameId={gameId} onClick={()=>console.log("host lobby click")} />;
    // return <PlayerWriteQuestions updatePlayerState={console.log} setA={console.log} setB={console.log} playerName={playerName}/>;
    // return <PlayerGameOver />;
    // return <HostGameOver />;
    return <HostReveal players={players} />;

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

    // return <PlayerWriteAnswers
    //     players={players}
    //     voterName="Matt"
    //     tallyVote={tallyVote}
    //     setVoterState={() => console.log('finished')}
    // />;
};

export default TestWrapper;