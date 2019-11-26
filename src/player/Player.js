import React, {useContext, useEffect, useState} from 'react';
import Lobby from '../components/Lobby';
import FirebaseContext from '../config/FirebaseContext';
import PlayerState from './PlayerState';
import PlayerWriteQuestions from './PlayerWriteQuestions';

const Player = ({gameId, playerName}) => {
    const [players, setPlayers] = useState({});
    const [playerState, setPlayerState] = useState({});

    const [optionA, setA] = useState('');
    const [optionB, setB] = useState('');

    const [questions, setQuestions] = useState({});
    const [hostState, setHostState] = useState('');
    const firebase = useContext(FirebaseContext);


    useEffect(() => {
        const ref = firebase.getGameRef(gameId);

        ref.on('value', (snapshot) => {
            const {players: _players, questions: _questions} = snapshot.val();
            setPlayers(_players);
            setQuestions(_questions);
        });

        return ref.off;
    }, []);

    useEffect(() => {
        const p = Object.values(players).find(p => p.name === playerName);
        console.log(p, players, playerName);
        if (p) {
            setPlayerState(p.state);
        }

    }, [players]);

    const contentSwitch = () => {

        const lobby = <Lobby gameId={gameId} players={players} isHost={false} />;

        console.log('contentSwitch', playerState);
        switch (playerState) {
            case PlayerState.LOBBY:
                return lobby;
            case PlayerState.WRITING_QUESTION:
                return <PlayerWriteQuestions setA={setA} setB={setB} onClick={() => {
                }} playerName={playerName}
                                             gameId={gameId} />;
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
