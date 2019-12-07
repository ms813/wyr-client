import React, {useContext, useEffect} from 'react';
import SpeechContext from '../speech/SpeakTtsContext';
import {SpeechEvent} from '../speech/SpeechService';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {Typography} from '@material-ui/core';

const HostGameOver = () => {
    const speech = useContext(SpeechContext);

    useEffect(() => {
        speech.speak(SpeechEvent.GAME_OVER);
    }, [speech]);

    return (
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
};

export default HostGameOver;