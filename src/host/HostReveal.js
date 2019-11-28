import React, {useContext, useEffect, useState} from 'react';
import SpeechContext from '../speech/SpeakTtsContext';
import {SpeechEvent} from '../speech/SpeechService';
import HostState from './HostState';

const HostReveal = ({players, setHostState}) => {

    const commentProbability = 0.15;
    const speech = useContext(SpeechContext);
    const [index, setIndex] = useState(0);

    const {name, optionA, optionB, votes} = Object.values(players)[index];

    useEffect(() => {
        if (index === 0) {
            speech.speak(SpeechEvent.REVEAL_FIRST_TIME, {args: players});
        }
        speech.speak(SpeechEvent.REVEAL_QUESTION, {args: {name, optionA, optionB, votes}});
        Object.entries(votes).forEach(([name, vote]) => {
            const args = {name, answer: vote === 'A' ? optionA : optionB};
            speech.speak(SpeechEvent.REVEAL_ANSWER, {args});
            if (Math.random() < commentProbability) {
                speech.speak(SpeechEvent.REVEAL_ANSWER_COMMENT, {args});
            }
        });
    }, [index]);

    return (
        <div id="host-reveal">
            <div>{name} asked:</div>
            <div>Would you rather <b>{optionA}</b> or <b>{optionB}</b>?</div>

            <div id="host-reveal-answers">{
                Object.entries(votes).map(([name, vote]) =>
                    <div key={name}><b>{name}</b> would rather {vote === 'A' ? optionA : optionB}</div>
                )
            } </div>
            <div id="host-reveal-controls">
                {
                    index > 0 &&
                    <button type="button" onClick={() => setIndex(index - 1)}>Previous</button>
                }
                {
                    index < Object.keys(players).length - 1 &&
                    <button type="button" onClick={() => setIndex(index + 1)}>Next</button>
                }
                {
                    index === Object.keys(players).length - 1 &&
                    <button type="button" onClick={() => setHostState(HostState.GAME_OVER)}>Finish</button>
                }
            </div>
        </div>
    );
};

export default HostReveal;