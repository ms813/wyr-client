import React from 'react';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const PlayerGameOver = () => (
    <Box py={2} textAlign="center" display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" height="75vh">
        <Typography>The game has finished.</Typography>
        <Typography>Thanks for playing!</Typography>
        <Typography>If you want to play again, the host can start another round!</Typography>
        <Box py={2}>
            <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Join a different Lobby</Button>
        </Box>
    </Box>
);

export default PlayerGameOver;