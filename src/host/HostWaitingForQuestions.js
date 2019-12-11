import React, {useContext, useEffect, useState} from 'react';
import SpeechContext from '../speech/SpeakTtsContext';
import PlayerState from '../player/PlayerState';
import {SpeechEvent} from '../speech/SpeechService';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Container from '@material-ui/core/Container';
import {Cancel, CheckCircle} from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import HostState from './HostState';
import Typography from '@material-ui/core/Typography';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    bigAvatar: {
        width: 100,
        height: 100
    }
}));

const HostWaitingForQuestions = ({players, setHostState}) => {

    const classes = useStyles();

    const speech = useContext(SpeechContext);
    const [announceFinished, setAnnounceFinished] = useState(true);

    const playerNames = Object.keys(players);

    useEffect(() => {
        speech.speak(SpeechEvent.HOST_WAITING_FOR_QUESTIONS, {args: {playerNames}});
    }, [speech]);

    const hasQuestion = (playerName) => {
        const player = players[playerName];
        return player.optionA && player.optionB;
    };

    const playerStates = Object.values(players).map(p => p.state);
    const allPlayersWrittenQuestions = playerStates.filter(state => state === PlayerState.WAITING_FOR_OTHER_PLAYERS).length === playerStates.length;

    if (allPlayersWrittenQuestions && announceFinished) {
        speech.speak(SpeechEvent.ALL_PLAYERS_WRITTEN_QUESTIONS);
        setAnnounceFinished(false);
    }

    return (
        <Container id="host-waiting-for-questions">
            <Box textAlign="center" py={2}>
                <Typography variant="h2">{
                    allPlayersWrittenQuestions
                        ? `Everyone has submitted a question`
                        : `Waiting on everyone to submit a question`
                }</Typography>
            </Box>
            <Container maxWidth="sm">
                <List>
                    {playerNames.map(name =>
                        <ListItem key={name}>
                            <ListItemAvatar>
                                <Avatar src={players[name].avatarUri} className={classes.bigAvatar} variant="square">{name}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={name}
                                          secondary={Math.random() < 0.15 && name.toLowerCase() === 'phil' ? 'okily dokily' : ''} />
                            <ListItemSecondaryAction>{
                                hasQuestion(name)
                                    ? <CheckCircle fontSize="large" htmlColor="green" />
                                    : <Cancel fontSize="large" htmlColor="red" />
                            }</ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            </Container>
            {
                allPlayersWrittenQuestions &&
                <Box textAlign="center">
                    <Button variant="contained" color="primary" size="large"
                            onClick={() => setHostState(HostState.WAITING_FOR_ANSWERS)}>Next</Button>
                </Box>
            }
        </Container>
    );
};

export default HostWaitingForQuestions;