import * as firebase from 'firebase/app';
import HostState from '../host/HostState';

const hri = require('human-readable-ids').hri;

class FirebaseService {

    database;

    constructor() {
        this.database = firebase.database();
    }

    createGame(callback) {
        const gameId = hri.random();

        const newGame = {
            players: [],
            hostState: HostState.HOST_LOBBY,
            questions: []
        };

        return this.database.ref(`/games/${gameId}`).set(newGame)
        .then(() => callback(gameId));
    }

    getGameRef(gameId) {
        console.log(`Getting firebase reference for Game:`, gameId);
        return this.database.ref(`/games/${gameId}`);
    }

    addPlayerToGame(gameId, playerName) {
        return this.database.ref(`/games/${gameId}/players`).push(playerName);
    }
}

export default FirebaseService;