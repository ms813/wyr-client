import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

    const [gameId, setGameId] = useState('');

    const [playerName, setPlayerName] = useState('');

    const joinGame = () => {
        console.log(gameId, playerName);

    };

    const createGame = () => {
        console.log('create game');
        axios.get(`/create-game`)
        .then(response => {
            console.log("Game successfully created: ", response);
            setGameId(response);
        })
    };

    return (
        <div className="App">
            <div>
                <button type="button" onClick={createGame}>Create game</button>
            </div>
            <div>
                <label>
                    Join Game:
                    <input type="text" name="joinGameInput" placeholder="Game ID"
                           value={gameId}
                           onChange={e => setGameId(e.target.value)}
                    />
                </label>
                <label>
                    Player Name:
                    <input type="text" name="playerName" placeholder={'Player name'}
                           value={playerName}
                           onChange={e => setPlayerName(e.target.value)}
                    />
                </label>
                <button type="button" onClick={joinGame}>Join</button>
            </div>
        </div>
    );
}

export default App;
