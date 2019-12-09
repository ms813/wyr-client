import React from 'react';
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const PlayerGameOver = () => (
    <Box py={2} display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" height="75vh">
        <Typography display="block">
            The game has finished.
            Thanks for playing!
        </Typography>
        <Box py={2}>
            <Button variant="contained" color="primary" onClick={() => window.location.reload()}>Again?</Button>
        </Box>
    </Box>
);

export default PlayerGameOver;