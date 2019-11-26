import React, {useContext, useEffect, useState} from 'react';
import Lobby from '../components/Lobby';
import FirebaseContext from '../firebase/FirebaseContext';
import PlayerState from './PlayerState';
import PlayerWriteQuestions from './PlayerWriteQuestions';

const Player = ({gameId, playerName}) => {
    const [players, setPlayers] = useState({});
    const [playerState, setPlayerState] = useState('');

    const [optionA, setA] = useState('');
    const [optionB, setB] = useState('');

    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const ref = firebase.getGameRef(gameId);
        ref.on('value', (snapshot) => {
            const {players: _players} = snapshot.val();
            setPlayers(_players);
            setPlayerState(_players[playerName].state);
        });
        return ref.off;
    }, []);


    useEffect(() => {
        if (playerState) {
            firebase.getPlayerRef(gameId, playerName).update({state: playerState});
        }
    }, [playerState]);

    useEffect(() => {
        firebase.getPlayerRef(gameId, playerName).update({optionA, optionB});
    }, [optionA, optionB]);

    const contentSwitch = () => {

        const lobby = <Lobby gameId={gameId} players={players} isHost={false} />;

        switch (playerState) {
            case PlayerState.LOBBY:
                return lobby;
            case PlayerState.WRITING_QUESTION:
                return <PlayerWriteQuestions
                    setA={setA}
                    setB={setB}
                    onClick={setPlayerState}
                    gameId={gameId}
                />;
            case PlayerState.WAITING_FOR_QUESTIONS:
                return <div>Waiting on everyone else to finish</div>;
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
