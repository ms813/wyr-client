import React, {useContext, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SpeechContext from '../config/SpeakTtsContext';
import HostState from './HostState';
import PlayerState from '../player/PlayerState';

const HostWaitingForQuestions = ({players, onClick}) => {

    const speech = useContext(SpeechContext);

    useEffect(() => {
        speech.speak({text: "All right glebe shots, would you rather what or what? Put in your questions now"})
    }, [])

    const playerNames = Object.values(players).map(p => p.name);

    const hasQuestion = (playerName) => {
        const player = Object.values(players).find(p => p.name ===playerName);
        return player.optionA && player.optionB;
    };

    const playerStates = Object.values(players).map(p => p.state);
    const allPlayersWrittenQuestions = playerStates.filter(state => state === PlayerState.WAITING_FOR_QUESTIONS).length === playerStates.length;
    console.log('all players written questions', allPlayersWrittenQuestions, playerStates.filter(p => p.state === PlayerState.WAITING_FOR_QUESTIONS), playerStates);

    if (allPlayersWrittenQuestions) {
        speech.speak({text: 'All players have finished writing their questions. Lets move on...'});
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
                <button type="button" onClick={() => onClick(HostState.WAITING_FOR_ANSWERS)}>Next</button>
            }
        </div>
    );
};

export default HostWaitingForQuestions;