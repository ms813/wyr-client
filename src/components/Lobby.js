import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import HostState from '../host/HostState';
import FirebaseContext from '../firebase/FirebaseContext';
import SpeechContext from '../speech/SpeakTtsContext';
import {SpeechEvent} from '../speech/SpeechService';
import Button from '@material-ui/core/Button';

const Lobby = ({gameId, players, isHost = false, onClick, errorText}) => {

    const firebase = useContext(FirebaseContext);
    const speech = useContext(SpeechContext);

    useEffect(() => {

        const speak = (speechEvent, args) => {
            // one time check to see if speech has been initialized
            if (isHost && speech) {
                speech.speak(speechEvent, args);
            }
        };

        speak(SpeechEvent.LOBBY_CREATED, {args: {gameId}});

        const ref = firebase.getPlayersRef(gameId)
        .on('child_added', lastAddedPlayerSnapshot => {
            const {name} = lastAddedPlayerSnapshot.val();
            speak(SpeechEvent.PLAYER_JOINED, {args: {name}});
        });

        return ref.off;
    }, [firebase, gameId, isHost, speech]);

    console.log("lobby error text", errorText);
    return (
        <div>
            <div>
                <h1>{isHost ? 'You are the host' : 'You are in the lobby'} for {gameId}</h1>
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
                    isHost && <Button variant="contained" color="primary" size="large"
                                      onClick={() => onClick(HostState.WAITING_FOR_QUESTIONS)}>Start</Button>

                }
            </div>
            {errorText && <div>{errorText}</div>}
        </div>
    );
};

Lobby.propTypes = {
    gameId: PropTypes.string,
    players: PropTypes.object,
    isHost: PropTypes.bool
};

export default Lobby;
