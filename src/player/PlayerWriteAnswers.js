import React, {Fragment, useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import {Container, makeStyles} from '@material-ui/core';
import PlayerState from './PlayerState';
import Divider from '@material-ui/core/Divider';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles(theme => ({
    toggle: {
        width: '100%',
        height: 'auto',
        minHeight: theme.spacing(7)

    }
}));

const PlayerWriteAnswers = ({players, voterName, tallyVote, setVoterState}) => {

    const classes = useStyles();

    const [votes, setVotes] = useState({});

    useEffect(() => {
        if (Object.keys(votes).length === Object.keys(players).length - 1) {
            return setVoterState(PlayerState.WAITING_FOR_OTHER_PLAYERS);
        }
    }, [votes, players]);

    const updateVotes = (vote, askerName, voterName) => {
        const newVotes = Object.assign({}, votes);
        newVotes[askerName] = vote;
        setVotes(newVotes);
        return tallyVote(vote, askerName, voterName);
    };

    return (
        <Container maxWidth="sm" id="player-write-answers">
            <Box py={1}><b>{voterName}</b>, would you rather...</Box>
            {
                Object.values(players).map((p, i) => {
                    if (p.name === voterName) {
                        // player can't vote for their own question
                        return null;
                    }

                    const radioName = `${p.name}-question`;
                    return (
                        <Fragment>
                            <Box key={radioName} my={5}>
                                <Box textAlign="center">
                                    <ToggleButton className={classes.toggle} value="check" selected={votes[p.name] === 'A'} size="large"
                                                  onChange={() => updateVotes('A', p.name, voterName)}>{p.optionA}</ToggleButton>
                                </Box>
                                <Box textAlign="center" py={2}>or</Box>
                                <Box textAlign="center">
                                    <ToggleButton className={classes.toggle} value="check" selected={votes[p.name] === 'B'} size="large"
                                                  onChange={() => updateVotes('B', p.name, voterName)}>{p.optionB}</ToggleButton>
                                </Box>
                            </Box>
                            {i < Object.values(players).length - 1 && <Divider />}
                        </Fragment>
                    );
                })
            }
        </Container>
    );
};

export default PlayerWriteAnswers;
