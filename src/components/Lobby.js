import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import HostState from '../host/HostState';
import FirebaseContext from '../config/FirebaseContext';
import SpeechContext from '../config/SpeakTtsContext';
import {DEFAULT_VOICE} from '../config/Utils';

const Lobby = ({gameId, players, isHost = false, onClick}) => {

    const firebase = useContext(FirebaseContext);
    const speech = useContext(SpeechContext);

    const speak = (text) => {
        if (isHost && speech.synthesisVoice) {
            speech.speak({text}).then(speech.setVoice(DEFAULT_VOICE));
        }
    };

    useEffect(() => {
        speak(`Welcome to ${gameId}`);

        const ref = firebase.getPlayersRef(gameId)
        .on('child_added', lastAddedPlayerSnapshot => {
            const {name, voice} = lastAddedPlayerSnapshot.val();
            console.log('last added player', name);
            speech.setVoice(voice)
            speak(`${name} has joined`)
        });
        return ref.off;
    }, []);

    return (
        <div>
            <h1>
                You are in the lobby for {gameId}
            </h1>
            {
                players
                    ? (
                        <ul>
                            {Object.values(players).map(
                                ({name}) => <li key={name}>{name}</li>
                            )}
                        </ul>
                    )
                    : 'Waiting on players to join'
            }
            {
                isHost
                && (
                    <button type="button" onClick={() => onClick(HostState.WAITING_FOR_QUESTIONS)}>
                        Start
                    </button>
                )
            }
        </div>
    );
};

Lobby.propTypes = {
    gameId: PropTypes.string,
    players: PropTypes.object,
    isHost: PropTypes.bool
};

export default Lobby;
