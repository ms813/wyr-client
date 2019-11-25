import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SpeechContext from '../config/SpeakTtsContext';

const HostWaitingForQuestions = ({players, questions}) => {

    const speech = useContext(SpeechContext);
    console.log(speech);
    // speech.speak({text: "Claire has really big boobs"})

    const playerNames = Object.values(players);

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
        </div>
    );
};

export default HostWaitingForQuestions;