import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import HostState from './HostState';
import SpeechContext from '../speech/SpeakTtsContext';
import {SpeechEvent} from '../speech/SpeechService';

const HostWaitingForAnswers = ({players, setHostState}) => {

    const [firstTime, setFirstTime] = useState(true);
    const speech = useContext(SpeechContext);

    const answerCounts = Object.values(players).map(player => {
        const answerCount = Object.values(players).reduce((acc, next) => {
            if (next.name !== player.name && next.votes && next.votes[player.name]) {
                acc--;
            }
            return acc;
        }, Object.keys(players).length - 1);
        return {name: player.name, remaining: answerCount};
    });

    const allPlayersAnswered = answerCounts.filter(a => a.remaining !== 0).length === 0;
    if (allPlayersAnswered && firstTime) {
        // triggered multiple times because of player state changes
        speech.speak(SpeechEvent.ALL_PLAYERS_ANSWERED);
        setFirstTime(false);
    }

    return (
        <div id="host-waiting-for-answers">
            <ul>
                {
                    answerCounts.map(({name, remaining}) =>
                        <li key={name}>
                            {name} {remaining > 0 ? `${remaining} remaining` : <FontAwesomeIcon icon="check-circle" />}
                        </li>
                    )
                }
            </ul>
            {
                allPlayersAnswered
                &&
                <button type="button" onClick={() => setHostState(HostState.REVEAL_QUESTION)}>Next</button>
            }
        </div>
    );
};

export default HostWaitingForAnswers;