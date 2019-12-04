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

    speak(speechEvent, {voice, args, listeners} = {voice: null, args: null}) {
        // exit early if voice is not initialized
        if (!this.speech.synthesisVoice) return;

        const t = voiceLines[speechEvent](args);
        if (t.voice) {
            this.speech.setVoice(t.voice);
        } else if (voice) {
            this.speech.setVoice(voice);
        }

        this.speech.speak({
            text: t.line,
            listeners: listeners
        });
        this.speech.setVoice(DEFAULT_VOICE);
    }
}

const SpeechEvent = {
    LOBBY_CREATED: 'LOBBY_CREATED',
    PLAYER_JOINED: 'PLAYER_JOINED',
    HOST_WAITING_FOR_QUESTIONS: 'HOST_WAITING_FOR_QUESTIONS',
    ALL_PLAYERS_WRITTEN_QUESTIONS: 'ALL_PLAYERS_WRITTEN_QUESTIONS',
    ALL_PLAYERS_ANSWERED: 'ALL_PLAYERS_ANSWERED',
    REVEAL_PLAYER_NAME: 'REVEAL_PLAYER_NAME',
    REVEAL_QUESTION: 'REVEAL_QUESTION',
    REVEAL_FIRST_TIME: 'REVEAL_FIRST_TIME',
    REVEAL_ANSWER: 'REVEAL_ANSWER',
    REVEAL_ANSWER_COMMENT: 'REVEAL_ANSWER_COMMENT',
    GAME_OVER: 'GAME_OVER',
    REQUEST_ANSWERS: 'REQUEST_ANSWERS'
};

const voiceLines = {
    [SpeechEvent.LOBBY_CREATED]: ({gameId, overrideProbability}) => {
        const lines = [
            {line: `Welcome to ${gameId}`}
        ];

        const overrides = {};

        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.PLAYER_JOINED]: ({name: playerName, overrideProbability}) => {
        const lines = [
            {line: `${playerName} has joined`},
            {line: `Welcome, ${playerName}`}
        ];
        const overrides = {
            phil: [
                {
                    line: `moshi moshi phil ${Math.random() > 0.5 ? 'dono' : 'san'}`,
                    voice: 'Google 日本語'
                },
                {
                    line: 'Bonjour... big Phil',
                    voice: 'Google français'
                },
                {line: 'Let us all pause for a moment and take stock of the wonder that is big Phil'}
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
    },

    [SpeechEvent.REQUEST_ANSWERS]: () => {
        const lines = [
            {line: 'I mean, if you don\'t understand what to do by this point you are beyond any help I can provide. Answer the damn questions.'}
        ];
        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.ALL_PLAYERS_ANSWERED]: () => {
        const lines = [
            {line: 'Looks like everyone is finished, lets get this over with'}
        ];
        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.REVEAL_FIRST_TIME]: ({players, overrideProbability}) => {
        const lines = [
            {line: 'Finally, on to the big reveal'}
        ];
        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.REVEAL_PLAYER_NAME]: ({name, overrideProbability}) => {
        const lines = [
            {line: `${name} asked.`}
        ];
        const overrides = {
            phil: [
                {line: `cheese steak 殿 asked.`, voice: 'Google 日本語'},
                {line: `Big Phil asked.`, voice: 'Google français'}
            ]
        };
        return chooseLineOrOverride(lines, name.toLowerCase(), overrides, overrideProbability);
    },

    [SpeechEvent.REVEAL_QUESTION]: ({name, optionA, optionB, votes, overrideProbability}) => {

        const lines = [
            {line: `Would you rather ${optionA} or ${optionB}`}
        ];

        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.REVEAL_ANSWER]: ({name, answer, overrideProbability}) => {

        const lines = [
            {line: `${name} would rather ${answer}`},
            {line: `${name} would rather ${answer}`}
        ];

        const overrides = {
            phil: [
                {line: `Flanders would rather Diddly`}
            ]
        };

        return chooseLineOrOverride(lines, name.toLowerCase(), overrides, overrideProbability);
    },

    [SpeechEvent.REVEAL_ANSWER_COMMENT]: ({name, answer}) => {

        const lines = [
            {line: `${name}? ${answer}? Did not see that coming`},
            {line: `*sigh*`},
            {line: `zzz`},
            {line: `yawn`},
            {line: `What! Really?`},
            {line: `I thought ${name} really hated ${answer}`}
        ];

        return chooseLineOrOverride(lines);
    },
    [SpeechEvent.GAME_OVER]: () => {

        const lines = [
            {line: `Looks like we're done here. Thanks for playing. Goodbye. Ta ta now. Au revoir. Adieu. Farewell. Get out of my pub muggins`}
        ];

        return chooseLineOrOverride(lines);
    }
};

const chooseLineOrOverride = (lines, overrideArg, overrides, overrideProbability = 0.15) => {
    if (Math.random() < overrideProbability && overrides && overrides[overrideArg]) {
        return overrides[overrideArg][randomBetween(0, overrides[overrideArg].length - 1)];
    }
    return lines[randomBetween(0, lines.length - 1)];
};

export default SpeechService;

export {SpeechEvent};