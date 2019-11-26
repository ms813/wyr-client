import Speech from 'speak-tts';
import {randomBetween} from '../config/Utils';
import {DEFAULT_VOICE} from './SpeakTtsContext';

class SpeechService {
    speech;
    voices;

    constructor(speechContext) {
        this.speech = new Speech();
        this.speech.init(speechContext).then(data => {
            console.log('Speech initialized', data);
            this.voices = data.voices.map(v => v.name);
        });
    }

    speak(speechEvent, {voice, args} = {voice: null, args: null}) {
        // exit early if voice is not initialized
        if (!this.speech.synthesisVoice) return;

        const t = voiceLines[speechEvent](args);
        if (t.voice) {
            this.speech.setVoice(t.voice);
        } else if (voice) {
            this.speech.setVoice(voice);
        }
        this.speech.speak({text: t.line});
        this.speech.setVoice(DEFAULT_VOICE);
    }
}

const SpeechEvent = {
    LOBBY_CREATED: 'LOBBY_CREATED',
    PLAYER_JOINED: 'PLAYER_JOINED',
    HOST_WAITING_FOR_QUESTIONS: 'HOST_WAITING_FOR_QUESTIONS',
    ALL_PLAYERS_WRITTEN_QUESTIONS: 'ALL_PLAYERS_WRITTEN_QUESTIONS'
};

const voiceLines = {
    [SpeechEvent.LOBBY_CREATED]: ([gameId]) => {
        const lines = [
            {line: `Welcome to ${gameId}`}
        ];

        const overrides = {};

        return chooseLineOrOverride(lines, gameId.toLowerCase(), overrides);
    },

    [SpeechEvent.PLAYER_JOINED]: ([playerName]) => {
        const lines = [
            {line: `${playerName} has joined`},
            {line: `Welcome, ${playerName}`}
        ];
        const overrides = {
            phil: [
                {
                    line: 'Hold up, big philly cheese steak has just entered the building',
                    voice: 'Google 日本語'
                },
                {
                    line: 'Let us all pause for a moment and take stock of the wonder that is... big Phil',
                    voice: 'Google français'
                }
            ],
            claire: [
                {line: 'Claire has joined, wub wub pipette that mouse angus'}
            ]
        };

        return chooseLineOrOverride(lines, playerName.toLowerCase(), overrides);
    },

    [SpeechEvent.HOST_WAITING_FOR_QUESTIONS]: () => {
        const lines = [
            {line: 'All right glebe shots, would you rather what or what? Put in your questions now'}
        ];

        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.ALL_PLAYERS_WRITTEN_QUESTIONS]: () => {
        const lines = [
            {line: 'All players have finished writing their questions. Lets move on...'}
        ];

        return chooseLineOrOverride(lines);
    }
};

const chooseLineOrOverride = (lines, arg, overrides) => {
    if (overrides && overrides[arg]) {
        return overrides[arg][randomBetween(0, overrides[arg].length - 1)];
    }
    return lines[randomBetween(0, lines.length - 1)];
};

export default SpeechService;

export {SpeechEvent};