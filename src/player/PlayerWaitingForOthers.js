import React from 'react';
import Box from '@material-ui/core/Box';
import {Container} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';

const PlayerWaitingForOthers = ({players, playerName}) => {

    const {optionA, optionB} = players[playerName];
    const createAnswer = ({votes, optionA, optionB, name}) => {

        let rather, than;
        if (votes[playerName] === 'A') {
            rather = optionA;
            than = optionB;
        } else {
            rather = optionB;
            than = optionA;
        }
        return (
            <ListItem key={name}>
                <ListItemIcon>
                    <CheckIcon />
                </ListItemIcon>
                <ListItemText primary={`${rather}`} secondary={`than ${than}`} />
            </ListItem>
        );
    };

    return (
        <Container id="player-write-questions">
            <Box py={2}>
                <Typography variant="h4"><b>{playerName}</b> is waiting on everyone else to finish</Typography>
            </Box>
            {
                optionA && optionB &&
                <Box py={2}>
                    <Typography variant="h5">You asked:</Typography>
                    <Box pl={4} py={1}>
                        <Typography>Would you rather <b>{optionA}</b> or <b>{optionB}?</b></Typography>
                    </Box>
                </Box>
            }
            {
                players &&
                Object.values(players).filter(p => p.votes && p.votes[playerName]).length > 0 &&
                <Box py={2}>
                    <Typography variant="h5">You would rather:</Typography>
                    <List>
                        {Object.values(players).map(player => {
                            return player.name !== playerName && createAnswer(player);
                        })}
                    </List>
                </Box>
            }
        </Container>
    );
};
export default PlayerWaitingForOthers;