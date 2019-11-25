import * as firebase from 'firebase/app';
import HostState from '../host/HostState';
import PlayerState from '../player/PlayerState';
import {DEFAULT_VOICE} from '../config/Utils';

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
        console.debug(`Getting firebase reference for Game:`, gameId);
        return this.database.ref(`/games/${gameId}`);
    }

    addPlayerToGame(gameId, playerName, voice) {
        console.log(`Adding player ${playerName} to game ${gameId} with voice ${voice}`);
        return this.database.ref(`/games/${gameId}/players`).push({
            name: playerName,
            voice: voice || DEFAULT_VOICE,
            state: PlayerState.LOBBY
        });
    }

    getPlayersRef(gameId) {
        return this.database.ref(`/games/${gameId}/players`);
    }
}

export default FirebaseService;
