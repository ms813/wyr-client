import React, {useContext, useEffect, useState} from 'react';
import Lobby from '../components/Lobby';
import FirebaseContext from '../firebase/FirebaseContext';
import PlayerState from './PlayerState';
import PlayerWriteQuestions from './PlayerWriteQuestions';
import PlayerWriteAnswers from './PlayerWriteAnswers';
import PlayerWaitingForOthers from './PlayerWaitingForOthers';
import PlayerGameOver from './PlayerGameOver';

const Player = ({gameId, playerName}) => {
    const [players, setPlayers] = useState({});
    const [playerState, setPlayerState] = useState(PlayerState.LOBBY);

    const [optionA, setA] = useState('');
    const [optionB, setB] = useState('');

    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const ref = firebase.getGameRef(gameId);
        ref.on('value', (snapshot) => {
            if (!snapshot || !snapshot.val()) {
                return ref.off();
            }
            const {players: _players} = snapshot.val();
            setPlayers(_players);
            setPlayerState(_players[playerName].state);
        });
        return ref.off;
    }, [firebase, gameId, playerName]);


    useEffect(() => {
        firebase.getPlayerRef(gameId, playerName).update({optionA, optionB});
    }, [optionA, optionB, firebase, gameId, playerName]);

    const updatePlayerState = (state) => {
        firebase.getPlayerRef(gameId, playerName).update({state: state});
        setPlayerState(state);
    };

    const tallyVote = (aOrB, askerName, voterName) => firebase.getPlayerRef(gameId, askerName).child(`/votes`).update({[voterName]: aOrB});


    const contentSwitch = () => {

        const lobby = <Lobby gameId={gameId} players={players} isHost={false} />;

        switch (playerState) {
            case PlayerState.LOBBY:
                return lobby;
            case PlayerState.WRITING_QUESTION:
                return <PlayerWriteQuestions
                    setA={setA}
                    setB={setB}
                    updatePlayerState={updatePlayerState}
                    playerName={playerName}
                />;
            case PlayerState.WAITING_FOR_OTHER_PLAYERS:
                return <PlayerWaitingForOthers playerName={playerName} players={players} />;
            case PlayerState.WRITING_ANSWERS:
                return <PlayerWriteAnswers players={players} voterName={playerName} tallyVote={tallyVote}
                                           setVoterState={updatePlayerState} />;
            case PlayerState.GAME_OVER:
                return <PlayerGameOver />;
            default:
                return lobby;
        }
    };

    return (
        <div id="player-parent">
            {contentSwitch()}
        </div>
    );
};

export default Player;
