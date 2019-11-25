import React from 'react';
import Speech from 'speak-tts';
import {DEFAULT_VOICE} from './Utils';

const speech = new Speech(); // will throw an exception if not browser supported
speech.init({
    volume: 1,
    lang: 'en-GB',
    rate: 1,
    pitch: 1,
    voice: DEFAULT_VOICE,
    splitSentences: true
}).then(data => {
    console.log('Speech initialized', data);
    speech.voices = data.voices.map(v => v.name);
});

const SpeechContext = React.createContext(speech);
export default SpeechContext;
