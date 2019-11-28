import React, {useContext, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SpeechContext from '../speech/SpeakTtsContext';
import HostState from './HostState';
import PlayerState from '../player/PlayerState';
import {SpeechEvent} from '../speech/SpeechService';

const HostWaitingForQuestions = ({players, setHostState}) => {

    const speech = useContext(SpeechContext);

    useEffect(() => {
        speech.speak(SpeechEvent.HOST_WAITING_FOR_QUESTIONS);
    }, [speech]);

    const playerNames = Object.values(players).map(p => p.name);

    const hasQuestion = (playerName) => {
        const player = Object.values(players).find(p => p.name === playerName);
        return player.optionA && player.optionB;
    };

    const playerStates = Object.values(players).map(p => p.state);
    const allPlayersWrittenQuestions = playerStates.filter(state => state === PlayerState.WAITING_FOR_OTHER_PLAYERS).length === playerStates.length;

    if (allPlayersWrittenQuestions) {
        speech.speak(SpeechEvent.ALL_PLAYERS_WRITTEN_QUESTIONS);
    }

    return (
        <div id="host-waiting-for-questions">
            <ul>
                {
                    playerNames.map(p =>
                        <li key={p}>
                            {p} {hasQuestion(p) ?
                            <FontAwesomeIcon icon="check-circle" /> :
                            <FontAwesomeIcon icon="times-circle" />}
                        </li>
                    )
                }
            </ul>
            {
                allPlayersWrittenQuestions &&
                <button type="button" onClick={() => setHostState(HostState.WAITING_FOR_ANSWERS)}>Next</button>
            }
        </div>
    );
};

export default HostWaitingForQuestions;