import React, {useContext, useEffect, useState} from 'react';
import Lobby from '../components/Lobby';
import FirebaseContext from '../config/FirebaseContext';
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
            setPlayerState(Object.values(_players).find(p => p.name === playerName).state);
        });
        return ref.off;
    }, []);


    useEffect(() => {
        if (playerState) {
            update({state: playerState}, playerName);
        }
    }, [playerState]);

    const update = (_val, _playerName) => {
        firebase.getPlayersRef(gameId).once('value', snapshot => {
            snapshot.forEach(child => {
                const {name} = child.val();
                if (name === playerName) {
                    console.log('updating player state', name, playerState);
                    child.ref.update(_val);
                }
            });
        });
    };

    useEffect(() => {
        update({optionA, optionB}, playerName);
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
