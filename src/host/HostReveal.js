import React, {Fragment, useContext, useEffect, useState} from 'react';
import SpeechContext from '../speech/SpeakTtsContext';
import {SpeechEvent} from '../speech/SpeechService';
import HostState from './HostState';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import {ListItemText, Typography} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';

const HostReveal = ({players, setHostState}) => {

    const commentProbability = 0.15;
    const speech = useContext(SpeechContext);
    const [sayIntro, setSayIntro] = useState(true);
    const [index, setIndex] = useState(0);
    const [speechIndex, setSpeechIndex] = useState(null);

    const {name, optionA, optionB, votes} = Object.values(players)[index];

    useEffect(() => {
        setSpeechIndex(0);
    }, [index]);

    useEffect(() => {
        const speechListeners = {
            onstart: ({utterance}) => setSpeechIndex(speechIndex + 1)
        };

        if (index === 0 && sayIntro) {
            speech.speak(SpeechEvent.REVEAL_FIRST_TIME, {args: players});
            setSayIntro(false);
        }

        if (speechIndex === 0) {
            speech.speak(
                SpeechEvent.REVEAL_PLAYER_NAME, {
                    args: {name},
                    listeners: speechListeners
                }
            );
        } else if (speechIndex === 1) {
            speech.speak(
                SpeechEvent.REVEAL_QUESTION, {
                    args: {name, optionA, optionB, votes},
                    listeners: speechListeners
                }
            );
        } else if (speechIndex > 1 && speechIndex - 2 < Object.keys(votes).length) {
            const name = Object.keys(votes)[speechIndex - 2];
            const vote = votes[name];
            const args = {
                name: name,
                answer: vote === 'A' ? optionA : optionB
            };

            // last round, need to increment the speech index one more time to make the next button appear
            let listeners = speechListeners;
            if (speechIndex - 1 === Object.keys(votes).length) {
                listeners = {
                    ...speechListeners,
                    onend: () => setSpeechIndex(Infinity)
                };
            }
            speech.speak(SpeechEvent.REVEAL_ANSWER, {args, listeners});
            if (Math.random() < commentProbability) {
                speech.speak(SpeechEvent.REVEAL_ANSWER_COMMENT, {args});
            }
        }

    }, [speechIndex]);

    const lineWrapQuestion = (optionA, optionB) => {
        if (optionA.length + optionB.length < 32) {
            return <Box pl={4} py={2}><Typography variant="h3">Would you rather <i>{optionA}</i> or <i>{optionB}</i>?</Typography></Box>;

        } else if (optionA.length + optionB.length < 64) {
            return (
                <Box pl={4} py={2}>
                    <Typography variant="h3">Would you rather:</Typography>
                    <Box pl={8}><Typography variant="h4"><i>{optionA}</i> <b>or</b> <i>{optionB}</i>?</Typography></Box>
                </Box>
            );
        } else {
            return (
                <Box pl={4} textAlign="left">
                    <Box py={2}><Typography variant="h3">Would you rather:</Typography></Box>
                    <Box textAlign="center">
                        <Typography variant="h5"><i>{optionA}</i></Typography>
                        <Typography>or</Typography>
                        <Typography variant="h5"><i>{optionB}</i></Typography>
                    </Box>
                </Box>
            );
        }
    };

    return (
        <Container id="host-reveal">
            <Slide direction="right" in={speechIndex > 0} mountOnEnter unmountOnExit>
                <Box py={2}><Typography variant="h1">{name} asked:</Typography></Box>
            </Slide>
            <Slide direction="left" in={speechIndex > 1} mountOnEnter unmountOnExit>
                {lineWrapQuestion(optionA, optionB)}
            </Slide>
            <Divider />
            <Box pt={8} pb={16} pl={32} id="host-reveal-answers">
                <List>{
                    Object.entries(votes).map(([name, vote], i) =>
                        <Slide key={name} direction={speechIndex % 2 === 0 ? 'left' : 'right'} in={speechIndex > i + 2} mountOnEnter unmountOnExit>
                            <ListItem key={name}>
                                <ListItemAvatar>
                                    <Avatar>{name}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primaryTypographyProps={{variant: 'h5'}}
                                              primary={<Fragment>{name} would rather <i>{vote === 'A' ? optionA : optionB}</i></Fragment>}
                                              secondary={Math.random() < 0.15 && name.toLowerCase() === 'phil' ? 'diddly' : ''} />
                            </ListItem>
                        </Slide>
                    )
                }</List>
            </Box>
            <Fade in={speechIndex > Object.keys(votes).length + 2} mountOnEnter unmountOnExit>
                <Box pl={128} id="host-reveal-controls">
                    {
                        index > 0 &&
                        <Button variant="contained" onClick={() => setIndex(index - 1)}>Previous</Button>
                    }
                    {
                        index < Object.keys(players).length - 1 &&
                        <Button variant="contained" color="primary" onClick={() => setIndex(index + 1)}>Next</Button>
                    }
                    {
                        index === Object.keys(players).length - 1 &&
                        <Button variant="contained" color="primary" onClick={() => setHostState(HostState.GAME_OVER)}>Finish</Button>
                    }
                </Box>
            </Fade>
        </Container>
    );
};

export default HostReveal;