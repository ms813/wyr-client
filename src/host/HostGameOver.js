import React, {useContext, useEffect} from 'react';
import SpeechContext from '../speech/SpeakTtsContext';
import {SpeechEvent} from '../speech/SpeechService';

const HostGameOver = () => {
    const speech = useContext(SpeechContext);

    useEffect(() => {
        speech.speak(SpeechEvent.GAME_OVER);
    }, [speech]);

    return (
        <div>
            The game has finished.
            Thanks for playing!
            <button onClick={() => window.location.reload()}>Again?</button>
        </div>
    );
};

export default HostGameOver;