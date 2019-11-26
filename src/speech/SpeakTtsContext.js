import React from 'react';
import SpeechService from './SpeechService';

const DEFAULT_VOICE = 'Google UK English Male';

const speechContext = {
    volume: 0.7,
    lang: 'en-GB',
    rate: 1,
    pitch: 1,
    voice: DEFAULT_VOICE,
    splitSentences: true
};

const SpeechContext = React.createContext(new SpeechService(speechContext));
export default SpeechContext;
export {DEFAULT_VOICE};
