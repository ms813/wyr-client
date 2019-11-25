import React, {useContext, useState} from 'react';
import './App.css';
import Landing from './components/Landing';
import Host from './host/Host';
import Player from './player/Player';
import Error from './components/Error';
import FirebaseContext from './config/FirebaseContext';
import SpeechContext from './config/SpeakTtsContext';
import {randomBetween} from './config/Utils';

function App() {
    const firebase = useContext(FirebaseContext);
    const speech = useContext(SpeechContext);

    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');

    const [clientType, setClientType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function isPlayerNameUnique(playerName, players) {
        console.log(playerName, players);
        return !Object.values(players).find((name) => name === playerName);
    }

    const joinGame = () => {
        setErrorMessage('');
        console.log(`Attempting to join game ${gameId}`);
        firebase.getGameRef(gameId).once('value').then((snapshot) => {
            const snapshotValue = snapshot.val();
            if (snapshotValue) {
                if (!isPlayerNameUnique(playerName, snapshotValue.players || [])) {
                    console.warn(`Failed to join game ${gameId} as player ${playerName}, because a player already exists with that name`);
                    return setErrorMessage('That name is already taken, please choose another!');
                }
                setClientType('player');
                firebase.addPlayerToGame(gameId, playerName, speech.voices[randomBetween(0, speech.voices.length)]);
                return setGameId(gameId);
            } else {
                console.warn(`Failed to join game ${gameId}, because it does not exist`);
                return setErrorMessage(`Failed to join game ${gameId}, because it does not exist`);
            }
        });
    };

    const createGame = () => {
        setErrorMessage('');
        console.log('Creating new game...');
        firebase.createGame((gameId) => {
            console.log('New game successfully created: ', gameId);
            firebase.getGameRef(gameId).once('value').then((snapshot) => {
                if (snapshot.val()) {
                    setGameId(gameId);
                    setClientType('host');
                } else {
                    const msg = `Failed to join game ${gameId}, because it does not exist`;
                    console.warn(msg);
                    setErrorMessage(msg);
                }
            });
        });
    };

    const landing = (
        <Landing
            setGameId={setGameId}
            setPlayerName={setPlayerName}
            joinGame={joinGame}
            createGame={createGame}
        />
    );

    const contentSwitch = () => {
        if (clientType === 'host') {
            return <Host gameId={gameId} />;
        }
        if (clientType === 'player') {
            return <Player gameId={gameId} playerName={playerName} />;
        }
        return landing;
    };

    return (
        <div>
            {contentSwitch()}
            {errorMessage && <Error errorMessage={errorMessage} />}
        </div>
    );
}

export default App;
