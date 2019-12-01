import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import HostState from '../host/HostState';
import FirebaseContext from '../firebase/FirebaseContext';
import SpeechContext from '../speech/SpeakTtsContext';
import {SpeechEvent} from '../speech/SpeechService';
import Button from '@material-ui/core/Button';
import {MIN_PLAYERS} from '../config/Utils';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {ListItemText} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';

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

    console.log('lobby error text', errorText);
    const playerCount = Object.keys(players).length;
    return (
        <div>
            <div>
                <Box textAlign="center">
                    <h1>Welcome to {gameId}</h1>
                    <h3>{players && playerCount >= MIN_PLAYERS
                        ? `Ready to start!`
                        : `Waiting on at least ${MIN_PLAYERS - playerCount} more players`
                    }</h3>
                </Box>
                <Box justifyContent="center" display="flex">
                    {
                        players
                            ? (
                                <List>
                                    {Object.values(players).map(({name}) =>
                                        <ListItem>
                                            <ListItemAvatar key={name}>
                                                <Avatar>{name}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={name}
                                                          secondary={name.toLowerCase() === 'phil' ? 'lol' : ''} />
                                        </ListItem>
                                    )}
                                </List>
                            )
                            : 'Waiting on players to join'
                    }
                </Box>
                <Box textAlign="center">
                    {
                        isHost && playerCount >= MIN_PLAYERS &&
                        <Button variant="contained" color="primary" size="large" width="228px"
                                onClick={() => onClick(HostState.WAITING_FOR_QUESTIONS)}>Start</Button>

                    }
                </Box>
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
