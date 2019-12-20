import React, {Fragment, useContext, useState} from 'react';
import HostState from './HostState';
import SpeechContext from '../speech/SpeakTtsContext';
import {SpeechEvent} from '../speech/SpeechService';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {ListItemText} from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {Cancel, CheckCircle} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    bigAvatar: {
        width: 100,
        height: 100
    }
}));

const HostWaitingForAnswers = ({players, setHostState}) => {

    const classes = useStyles();

    const [firstTime, setFirstTime] = useState(true);
    const [allAnsweredFirstTime, setAllAnsweredFirstTime] = useState(true);
    const speech = useContext(SpeechContext);

    const answerCounts = Object.values(players).map(player => {
        const answerCount = Object.values(players).reduce((acc, next) => {
            if (next.name !== player.name && next.votes && next.votes[player.name]) {
                acc--;
            }
            return acc;
        }, Object.keys(players).length - 1);
        return {name: player.name, remaining: answerCount};
    });

    if (firstTime) {
        speech.speak(SpeechEvent.REQUEST_ANSWERS, {args: {playerNames: Object.keys(players)}});
        setFirstTime(false);
    }

    const allPlayersAnswered = answerCounts.filter(a => a.remaining !== 0).length === 0;
    if (allPlayersAnswered && allAnsweredFirstTime) {
        // triggered multiple times because of player state changes
        speech.speak(SpeechEvent.ALL_PLAYERS_ANSWERED, {args: {playerNames: Object.keys(players)}});
        setAllAnsweredFirstTime(false);
    }

    return (
        <Container id="host-waiting-for-answers">
            <Box textAlign="center" py={2}>
                <Typography variant="h2">{
                    allPlayersAnswered
                        ? `Everyone has submitted their answers`
                        : `Waiting on everyone to submit their answers`
                }</Typography>
            </Box>
            <Container maxWidth="sm">
                <List>
                    {answerCounts.map(({name, remaining}) =>
                        <ListItem key={name}>
                            <ListItemAvatar>
                                <Avatar src={players[name].avatarUri} className={classes.bigAvatar} variant="square">{name}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name} secondary={Math.random() < 0.15 && name.toLowerCase() === 'phil' ? 'diddly' : ''} />
                            <ListItemSecondaryAction>{
                                remaining > 0
                                    ? <Fragment>{remaining} remaining <Cancel fontSize="large" htmlColor="red" /></Fragment>
                                    : <CheckCircle fontSize="large" htmlColor="green" />
                            }</ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            </Container>
            {
                allPlayersAnswered &&
                <Box textAlign="center">
                    <Button variant="contained" color="primary" size="large"
                            onClick={() => setHostState(HostState.REVEAL)}>Next</Button>
                </Box>
            }
        </Container>
    );
};

export default HostWaitingForAnswers;