import React from 'react';
import PlayerState from './PlayerState';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import {Container} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const PlayerWriteQuestions = ({updatePlayerState, setA, setB, playerName}) => {
    return (
        <Container maxWidth="sm" id="player-write-questions">
            <Box py={1}><b>{playerName}</b>, ask others if they would rather...</Box>
            <Box py={1} display="flex" flexDirection="column">
                <TextField label="Option A" variant="outlined" onChange={e => setA(e.target.value)} />
                <Box py={1} textAlign="center">or</Box>
                <TextField label="Option B" variant="outlined" onChange={e => setB(e.target.value)} />
                <Box py={1} textAlign="center">?</Box>
            </Box>
            <Box>
                <Button variant="contained" color="primary" onClick={() => updatePlayerState(PlayerState.WAITING_FOR_OTHER_PLAYERS)} size="large" fullWidth>Submit</Button>
            </Box>
        </Container>
    );
};

export default PlayerWriteQuestions;