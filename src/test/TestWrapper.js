import React, {useState} from 'react';
import HostReveal from '../host/HostReveal';
import Paint from '../components/Paint';
import HostLobby from '../host/HostLobby';

const TestWrapper = ({gameId = 'angry-goat-2'}) => {
    const [ready, setReady] = useState(false);

    const players = {
        Phil: {
            name: 'Phil',
            optionA: 'Stilton',
            optionB: 'Brie',
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
            optionA: 'Red pepper soup',
            optionB: 'Chilli prawns',
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

    // return <Paint saveImage={console.log} canvasHeight={250} canvasWidth={250} />;
    // return <Paint />;

    // return <HostWaitingForQuestions players={players} />;
    setTimeout(()=> setReady(true), 500);

    if(ready){
        return <HostLobby players={players} gameId={gameId} onClick={()=>console.log("host lobby click")} />;
    } else {
        return "Loading..."
    }

    // return <PlayerLobby players={players} gameId={gameId} onClick={()=>console.log("host lobby click")} />;
    // return <PlayerWriteQuestions updatePlayerState={console.log} setA={console.log} setB={console.log} playerName={playerName}/>;
    // return <PlayerGameOver />;
    // return <HostGameOver />;
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

    // return <PlayerWriteAnswers
    //     players={players}
    //     voterName="Matt"
    //     tallyVote={tallyVote}
    //     setVoterState={() => console.log('finished')}
    // />;
};

export default TestWrapper;