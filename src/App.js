import React, {useEffect, useState} from 'react';
import './App.css';
import FirebaseService from './firebase/firebase.service';
import Landing from './components/Landing';
import Host from './host/Host';
import Player from './player/Player';
import Error from './components/Error';

function App() {

    const firebaseService = new FirebaseService();

    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');

    const [clientType, setClientType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const joinGame = () => {
        setErrorMessage('');
        console.log(`Attempting to join game ${gameId}`);
        firebaseService.getGameRef(gameId).once('value').then((snapshot) => {
            const snapshotValue = snapshot.val();
            if (snapshotValue) {
                if (!isPlayerNameUnique(playerName, snapshotValue.players || [])) {
                    console.warn(`Failed to join game ${gameId} as player ${playerName}, because a player already exists with that name`);
                    return setErrorMessage(`That name is already taken, please choose another!`);
                }
                setClientType('player');
                firebaseService.addPlayerToGame(gameId, playerName);
                setGameId(gameId);
            } else {
                console.warn(`Failed to join game ${gameId}, because it does not exist`);
                setErrorMessage(`Failed to join game ${gameId}, because it does not exist`);
            }
        });
    };


    function isPlayerNameUnique(playerName, players) {
        console.log(playerName, players);
        return !Object.values(players).find(name => name === playerName);
    }

    const createGame = () => {
        setErrorMessage('');
        console.log('Creating new game...');
        firebaseService.createGame(gameId => {
            console.log('New game successfully created: ', gameId);
            firebaseService.getGameRef(gameId).once('value').then((snapshot) => {
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

    const landing = <Landing
        setGameId={setGameId}
        setPlayerName={setPlayerName}
        joinGame={joinGame}
        createGame={createGame}
    />;

    const contentSwitch = () => {
        if (clientType === 'host') {
            return <Host gameId={gameId} />;
        } else if (clientType === 'player') {
            return <Player gameId={gameId} playerName={playerName} />;
        } else {
            return landing;
        }
    };

    return <div>{contentSwitch()} {errorMessage && <Error errorMessage={errorMessage} />} </div>;
}

export default App;
