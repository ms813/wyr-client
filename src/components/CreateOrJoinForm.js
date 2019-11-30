import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2)
    },
    center: {
        textAlign: 'center'
    },
    inputField: {
        paddingTop:  theme.spacing(1),
        paddingBottom:  theme.spacing(1),
        width: theme.spacing(36),
        minWidth: theme.spacing(36),
    }
}));

const CreateOrJoinForm = ({setGameId, setPlayerName, joinGame, createGame, gameIdError, playerNameError}) => {
    const classes = useStyles();
    return (
        <div className={classes.root} id="create-or-join">
            <p className={classes.center}>A group game for asking your granny stupid questions</p>
            <Box className={classes.center} display="flex" flexDirection="column" alignContent="center" flexWrap="wrap">
                <Box className={classes.inputField}>
                    <TextField id="game-name-input" label="Room Name" variant="outlined"
                               onChange={(e) => setGameId(e.target.value.toLowerCase())}
                               error={!!gameIdError} helperText={gameIdError} fullWidth />
                </Box>
                <Box className={classes.inputField}>
                    <TextField id="player-name-input" label="Player Name" variant="outlined"
                               onChange={(e) => setPlayerName(e.target.value.toLowerCase())}
                               error={!!playerNameError} helperText={playerNameError} fullWidth />
                </Box>
                <Box className={classes.inputField}>
                    <Button variant="contained" color="primary" onClick={joinGame} size="large" fullWidth>Join</Button>
                </Box>
            </Box>

            <Box className={classes.center} mt={5}>
                <Button variant="contained" color="secondary" onClick={createGame} size="large">Create game</Button>
            </Box>
        </div>
    );
};

export default CreateOrJoinForm;
