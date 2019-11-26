import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SpeechContext from '../config/SpeakTtsContext';
import HostState from './HostState';

const HostWaitingForQuestions = ({players, questions, onClick}) => {

    const speech = useContext(SpeechContext);
    console.log(speech);

    const playerNames = Object.values(players).map(p => p.name);

    const hasQuestion = (playerName) => questions && Object.values(questions).find(q => q.player === playerName);

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
            <button type="button" onClick={() => onClick(HostState.WAITING_FOR_ANSWERS)}>Next</button>
        </div>
    );
};

export default HostWaitingForQuestions;