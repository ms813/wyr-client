import * as firebase from 'firebase/app';
import PlayerState from '../player/PlayerState';

const hri = require('human-readable-ids').hri;

class FirebaseService {

    database;

    constructor() {
        this.database = firebase.database();
    }

    createGame(gameId, callback) {
        if(!gameId){
            gameId = hri.random().replace(/-/gi, ' ');
        }
        const newGame = {
            players: [],
            questions: [],
            created: Date()
        };

        return this.database.ref(`/games/${gameId}`).set(newGame)
        .then(() => callback(gameId));
    }

    getGameRef(gameId) {
        console.debug(`Getting firebase reference for Game:`, gameId);
        return this.database.ref(`/games/${gameId}`);
    }

    addPlayerToGame(gameId, playerName) {
        console.log(`Adding player ${playerName} to game ${gameId}`);
        return this.database.ref(`/games/${gameId}/players/${playerName}`).set({
            name: playerName,
            state: PlayerState.CREATE_AVATAR
        });
    }

    getPlayersRef(gameId){
        return this.database.ref(`/games/${gameId}/players`);
    }

    getPlayerRef(gameId, playerName) {
        return this.database.ref(`/games/${gameId}/players/${playerName}`);
    }
}

export default FirebaseService;
