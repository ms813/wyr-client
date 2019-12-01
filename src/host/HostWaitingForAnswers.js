import React, {Fragment, useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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

const HostWaitingForAnswers = ({players, setHostState}) => {

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

    if(firstTime){
        speech.speak(SpeechEvent.REQUEST_ANSWERS);
        setFirstTime(false);
    }

    const allPlayersAnswered = answerCounts.filter(a => a.remaining !== 0).length === 0;
    if (allPlayersAnswered && allAnsweredFirstTime) {
        // triggered multiple times because of player state changes
        speech.speak(SpeechEvent.ALL_PLAYERS_ANSWERED);
        setAllAnsweredFirstTime(false);
    }

    return (
        <Container maxWidth="sm" id="host-waiting-for-answers">
            <h2 style={{textAlign: 'center'}}>{
                allPlayersAnswered
                    ? `Everyone has submitted their answers`
                    : `Waiting on everyone to submit their answers`
            }</h2>
            <List>
                {answerCounts.map(({name, remaining}) =>
                    <ListItem key={name}>
                        <ListItemAvatar>
                            <Avatar>{name}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={name} secondary={name.toLowerCase() === 'phil' ? 'lol' : ''} />
                        <ListItemSecondaryAction>{
                            remaining > 0
                                ? <Fragment>{remaining} remaining <FontAwesomeIcon icon="times-circle" size="2x" color="red" /></Fragment>
                                : <FontAwesomeIcon icon="check-circle" size="2x" color="green" />
                        }</ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>
            {
                allPlayersAnswered &&
                <Box textAlign="center">
                    <Button variant="contained" color="primary" size="large"
                            onClick={() => setHostState(HostState.REVEAL)}>Next</Button>
                </Box>
            }
        </Container>
        // <div id="host-waiting-for-answers">
        //     <ul>
        //         {
        //             answerCounts.map(({name, remaining}) =>
        //                 <li key={name}>
        //                     {name} {remaining > 0 ? `${remaining} remaining` : <FontAwesomeIcon icon="check-circle" />}
        //                 </li>
        //             )
        //         }
        //     </ul>
        //     {
        //         allPlayersAnswered
        //         &&
        //         <button type="button" onClick={() => setHostState(HostState.REVEAL_QUESTION)}>Next</button>
        //     }
        // </div>
    );
};

export default HostWaitingForAnswers;