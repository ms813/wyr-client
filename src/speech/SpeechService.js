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
    PLAYER_LEFT: 'PLAYER_LEFT',
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

    [SpeechEvent.PLAYER_LEFT]: ({name: playerName, overrideProbability}) => {
        const lines = [
            {line: `${playerName} has left`},
            {line: `Guess ${playerName} couldn't take the heat`},
            {line: `Bye bye, ${playerName}`},
            {line: `${playerName}, don't let the door hit you on the way out`}
        ];

        return chooseLineOrOverride(lines);
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
            {line: `Choose your answers now`},
            {line: `Please enter your answers`},
            {line: `Please enter your answers to the questions`},
            {line: `Enter some answers to the questions`},
            {line: `Would you rather what or what? Time to let the world know`},
            {line: `Answer the questions please`},
            {line: `Answer the questions now`},
            {line: `It's time to answer the questions`},
            {line: `Answer the questions jabronis`},
            {line: `Wow, its finally time to answer the questions`},
            {line: `Put in your answers now`},
            {line: `Please hurry up and put in your answers so we can end this charade`},
            {line: `I mean, if you don't understand what to do by this point you are beyond any help I can provide. Answer the damn questions.`}
        ];
        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.ALL_PLAYERS_ANSWERED]: () => {
        const lines = [
            {line: `Looks like everyone is finished, lets get this over with`},
            {line: `I can hardly contain my excitement, we are ready to reveal all the questions and answers`},
        ];
        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.REVEAL_FIRST_TIME]: ({players, overrideProbability}) => {
        const lines = [
            {line: 'Finally, on to the big reveal'},
            {line: `Wow I'm so exited, let's see what everyone answered`},
            {line: `That's 5 minutes that none of you will get back, lets see what you all wrote`},
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
            {line: `Would you rather ${optionA} or ${optionB}`},
            {line: `${optionA} or ${optionB}`}
        ];

        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.REVEAL_ANSWER]: ({name, rather, than, overrideProbability}) => {

        const lines = [
            {line: `${name} would rather ${rather}`},
            {line: `${name} would rather ${rather} than ${than}`},
            {line: `${rather} is ${name}'s preference`},
            {line: `${name} prefers ${rather}`},
            {line: `${name} prefers ${rather} to ${than}`},
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
            {line: `Looks like we're done here. Thanks for playing. Goodbye. Ta ta now. Au revoir. Adieu. Farewell. Get out of my pub muggins`},
            {line: `What a way to spend your day. Bye.`},
            {line: `Thanks for playing, see you around`},
            {line: `The game is over, thank you for playing`},
            {line: `Game over chumps, goodbye`},
            {line: `I'm out of here, bye`},
            {line: `My shift is over and I have 8 kilos of cocaine with my name on it, later losers`},
            {line: `This is the worst gig have had since being Kylie Minogue's foot stool, I'm glad its over`},
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