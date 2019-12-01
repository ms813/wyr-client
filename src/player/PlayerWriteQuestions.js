import React, {useState} from 'react';
import PlayerState from './PlayerState';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import {Container} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const PlayerWriteQuestions = ({updatePlayerState, setA, setB, playerName}) => {
    const [errorA, setErrorA] = useState('');
    const [errorB, setErrorB] = useState('');
    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');

    const onSubmit = () => {
        if (!optionA) {
            setErrorA('Enter something for option A!');
            return;
        }

        if (!optionB) {
            setErrorB('Enter something for option B!');
            return;
        }

        setA(optionA);
        setB(optionB);
        updatePlayerState(PlayerState.WAITING_FOR_OTHER_PLAYERS);
    };

    return (
        <Container maxWidth="sm" id="player-write-questions">
            <Box py={1}><b>{playerName}</b>, ask others if they would rather...</Box>
            <Box py={1} display="flex" flexDirection="column">
                <TextField label="Option A" variant="outlined" helperText={errorA} error={!!errorA} onChange={e => {
                    setErrorA('');
                    return setOptionA(e.target.value);
                }} />
                <Box py={1} textAlign="center">or</Box>
                <TextField label="Option B" variant="outlined" helperText={errorB} error={!!errorB} onChange={e => {
                    setErrorB('');
                    return setOptionB(e.target.value);
                }} />
                <Box py={1} textAlign="center">?</Box>
            </Box>
            <Box textAlign="center">
                <Button variant="contained" color="primary" size="large" fullWidth
                        onClick={onSubmit}>Submit</Button>
            </Box>
        </Container>
    );
};

export default PlayerWriteQuestions;