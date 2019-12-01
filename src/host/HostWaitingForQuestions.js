import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SpeechContext from '../speech/SpeakTtsContext';
import HostState from './HostState';
import PlayerState from '../player/PlayerState';
import {SpeechEvent} from '../speech/SpeechService';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const HostWaitingForQuestions = ({players, setHostState}) => {

    const speech = useContext(SpeechContext);
    const [announceFinished, setAnnounceFinished] = useState(true);

    useEffect(() => {
        speech.speak(SpeechEvent.HOST_WAITING_FOR_QUESTIONS);
    }, [speech]);

    const playerNames = Object.keys(players);

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
        <Container maxWidth="sm" id="host-waiting-for-questions">
            <h2 style={{textAlign: 'center'}}>{
                allPlayersWrittenQuestions
                    ? `Everyone has submitted a question`
                    : `Waiting on everyone to submit a question`
            }</h2>
            <List>
                {playerNames.map(name =>
                    <ListItem key={name}>
                        <ListItemAvatar>
                            <Avatar>{name}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={name} secondary={name.toLowerCase() === 'phil' ? 'lol' : ''} />
                        <ListItemSecondaryAction>{
                            hasQuestion(name)
                                ? <FontAwesomeIcon icon="check-circle" size="2x" color="green" />
                                : <FontAwesomeIcon icon="times-circle" size="2x" color="red" />
                        }</ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
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