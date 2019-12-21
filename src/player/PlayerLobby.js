import React from 'react';
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
import {CheckCircle} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    bigAvatar: {
        width: 100,
        height: 100
    }
}));

const PlayerLobby = ({gameId, players, onLeave, errorText}) => {

    const classes = useStyles();

    const playerCount = Object.keys(players).length;
    return (
        <div>
            <div>
                <Box textAlign="center">
                    <Box py={2}>
                        <Typography variant="h5">Welcome to</Typography>
                        <Typography variant="h4">{gameId}</Typography>
                    </Box>
                    <Box py={2}>
                        <Typography variant="h5">{players && playerCount >= MIN_PLAYERS
                            ? `Ready to start!`
                            : `Waiting on at least ${MIN_PLAYERS - playerCount} more player${MIN_PLAYERS - playerCount > 1 ? 's' : ''}`
                        }</Typography>
                    </Box>
                    <Box textAlign="center">
                        <Button variant="contained" color="secondary" onClick={onLeave}>Leave Lobby</Button>
                    </Box>
                </Box>
                <Container maxWidth="sm">{
                    players ? (
                            <List>{
                                Object.values(players).map(({name, avatarUri}) =>
                                    <ListItem key={name}>
                                        <ListItemAvatar>
                                            <Avatar src={avatarUri} className={classes.bigAvatar} variant="square">{name}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={name}
                                                      secondary={Math.random() < 0.15 && name.toLowerCase() === 'phil' ? 'howdy-do neighbour' : ''} />
                                        <ListItemSecondaryAction>
                                            <CheckCircle fontSize="large" htmlColor="green" />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            }</List>
                        )
                        : 'Waiting on players to join'
                }</Container>
            </div>
            {errorText && <div>{errorText}</div>}
        </div>
    );
};

export default PlayerLobby;