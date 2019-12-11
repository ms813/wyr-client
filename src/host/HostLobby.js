import React, {useContext, useEffect} from 'react';
import HostState from './HostState';
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
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {Cancel, CheckCircle} from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    bigAvatar: {
        width: 100,
        height: 100
    }
}));

const HostLobby = ({gameId, players, onClick, errorText}) => {

    const classes = useStyles();

    const firebase = useContext(FirebaseContext);
    const speech = useContext(SpeechContext);

    useEffect(() => {

        speech.speak(SpeechEvent.LOBBY_CREATED, {args: {gameId}});

        const ref = firebase.getPlayersRef(gameId);
        ref.on('child_added', lastAddedPlayerSnapshot => {
            const {name} = lastAddedPlayerSnapshot.val();
            speech.speak(SpeechEvent.PLAYER_JOINED, {args: {name}});
        });

        ref.on('child_removed', removedPlayerSnapshot => {
            const {name} = removedPlayerSnapshot.val();
            speech.speak(SpeechEvent.PLAYER_LEFT, {args: {name}});
        });

        return () => {
            ref.off('child_added');
            ref.off('child_removed');
        };

    }, [firebase, gameId, speech]);

    const playerCount = Object.keys(players).length;
    return (
        <div>
            <div>
                <Box textAlign="center">
                    <Box py={2}>
                        <Typography variant="h2">Welcome to</Typography>
                        <Typography variant="h1">{gameId}</Typography>
                    </Box>
                    <Box py={2}>{
                        players && playerCount >= MIN_PLAYERS
                            ? <Button variant="contained" color="primary" size="large"
                                      onClick={() => onClick(HostState.WAITING_FOR_QUESTIONS)}>Start</Button>
                            : <Typography variant="h4">
                                Waiting on at least {MIN_PLAYERS - playerCount} more player{MIN_PLAYERS - playerCount > 1 ? 's' : ''}
                            </Typography>
                    }</Box>
                </Box>
                <Container maxWidth="sm">{
                    players
                        ? (
                            <List>
                                {Object.values(players).map(({name, avatarUri}) =>
                                    <ListItem key={name}>
                                        <ListItemAvatar>
                                            <Avatar src={avatarUri} className={classes.bigAvatar} variant="square">{name}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={name}
                                                      secondary={Math.random() < 0.15 && name.toLowerCase() === 'phil' ? 'howdy-do neighbour' : ''} />
                                        <ListItemSecondaryAction>{
                                            avatarUri
                                                ? <CheckCircle fontSize="large" htmlColor="green" />
                                                : <Cancel fontSize="large" htmlColor="red" />
                                        }</ListItemSecondaryAction>
                                    </ListItem>
                                )}
                            </List>
                        )
                        : 'Waiting on players to join'
                }</Container>
            </div>
            {errorText && <div>{errorText}</div>}
        </div>
    );
};

export default HostLobby;