import Speech from 'speak-tts';
import { randomBetween } from '../config/Utils';
import { DEFAULT_VOICE } from './SpeakTtsContext';

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

    speak(speechEvent, { voice, args, listeners } = { voice: null, args: null }) {
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
    [SpeechEvent.LOBBY_CREATED]: ({ gameId, overrideProbability }) => {
        const lines = [
            { line: `${gameId} is open for business` },
            { line: `Type in ${gameId} in the room name field to play` },
            { line: `Enter in ${gameId} in the room name box` },
            { line: `Roll up, roll up, ${gameId} is open` },
            { line: `${gameId} is ready for a game of Would You Rather?` },
            { line: `Tell your granny, ${gameId} is open` },
            { line: `${gameId} is hosted and ready for action` },
            { line: `Hello and welcome to ${gameId}` },
            { line: `Greetings and welcome to ${gameId}` },
            { line: `${gameId} created and waiting for players` },
            { line: `Buckle in ${gameId} is about to start. Type in ${gameId} to join` },
            { line: `The first rule of ${gameId} is: You do not talk about ${gameId}.` },
            { line: `The boring people have all gone home. We're left with the creme de la creme. Let's play Would You Rather. Type in ${gameId} to join.` },
            { line: `I don't know who you are, I don't know what you want. But I do know I have a very particular set of skills. Skills I have aquired over a very long career. Skills that make me a nightmare for people like you. If you enter ${gameId} now, that will be the end of it. I will not look for you. I will not pursue you. But if you don't, I will look for you, I will find you, and I. will. kill. you. ` },
            { line: `My name is Maximus Decimus Meridius, commander of the Hard drives of the North, General of the Javascript Legions and loyal servant to the true emperor, Microsoft Windows. Father to a murdered function. Husband to a murdered script. Join ${gameId}, and I will have my vengeance, in this file drive or the next.` },
        ];

        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.PLAYER_JOINED]: ({ name: playerName, overrideProbability }) => {
        const lines = [
            { line: `${playerName} has joined` },
            { line: `${playerName} has signed up` },
            { line: `${playerName} has entered the building` },
            { line: `${playerName} is ready` },
            { line: `${playerName} is ready for action` },
            { line: `${playerName} is down to play` },
            { line: `${playerName} is prepared` },
            { line: `${playerName} is hungry for knowledge` },
            { line: `${playerName} wants to play` },
            { line: `${playerName} loves fun` },
            { line: `${playerName} figured out how to join` },
            { line: `Welcome, ${playerName}` },
            { line: `Greetings ${playerName}` },
            { line: `Hello, ${playerName}` },
            { line: `${playerName}, you legend` },
            { line: `${playerName}? What kind of name is that?` },
            { line: `${playerName}? What a fat ned.` },
            { line: `Of all the gin joints in all the towns in all the world, ${playerName} walks in to mine.` },
            { line: `Off to a great start ${playerName}, you found the right room.` }

        ];
        const overrides = {
            phil: [
                {
                    line: `moshi moshi phil ${Math.random() > 0.5 ? 'dono' : 'san'}`,
                    voice: `Google 日本語`
                },
                {
                    line: `Bonjour... big Phil`,
                    voice: `Google français`
                },
                { line: `Let us all pause for a moment and take stock of the wonder that is big Phil` },
                { line: `Time for a slice of Philly Cheese steak` }
            ],
            claire: [
                { line: `Claire has joined, wub wub pipette that mouse angus` }
            ],
            gayle: [
                { line: `Looks like Gayle has dragged herself away from the gin long enough to play Would You Rather` },


            ]
        };

        return chooseLineOrOverride(lines, playerName.toLowerCase(), overrides);
    },

    [SpeechEvent.PLAYER_LEFT]: ({ name: playerName, overrideProbability }) => {
        const lines = [
            { line: `${playerName} has left` },
            { line: `Guess ${playerName} couldn't take the heat` },
            { line: `Bye bye, ${playerName}` },
            { line: `${playerName}, don't let the door hit you on the way out` }
        ];

        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.HOST_WAITING_FOR_QUESTIONS]: ({ playerNames }) => {
        const lines = [
            { line: `Would you rather what or what? Put in your questions now` },
            { line: `All right folks, would you rather what or what? Put in your questions now` },
            { line: `Time to ask some questions, what do you want to know about ${playerNames[randomBetween(0, playerNames.length - 1)]}?` },
            { line: `Enter your burning questions in the boxes` },
            { line: `Would you rather what or what? Time to enter your questions` },
            { line: `Would you rather what or what? Time to ask others what you've always wanted to know` },
            { line: `Ask the rest of the players what they would rather` },
            { line: `Go ahead, make my day. Put in your questions now.` },
            { line: `I'm just a computer program. standing in front of some drunk folks. Asking them to enter their questions.` },
        ];

        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.ALL_PLAYERS_WRITTEN_QUESTIONS]: () => {
        const lines = [
            { line: `All players have finished writing their questions. Lets move on...` },
            { line: `All players have finished writing their questions. The host should move on` },
            { line: `Everyone has finished writing their questions. The host should move on` },
            { line: `Everyone has finished writing their questions. Lets move on...` },
            { line: `That didn't take as long as I expected. Lets move on...` },
            { line: `That didn't take long at all. Lets move on...` },
            { line: `Looks like everyone has finished entering their questions` },
            { line: `The questions are in, ready to move on` },
            { line: `I've got all of the questions, you've got all the answers` },
            { line: `That'll do pig that'll do. Questions are written, let's move on` },
            { line: `I love the smell of questions in the morning. Now it is time to answer them` },
        ];

        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.REQUEST_ANSWERS]: ({ playerNames }) => {
        const lines = [
            { line: `Choose your answers now. Come on ${playerNames[randomBetween(0, playerNames.length - 1)]}, don't let the alcohol buzz die.` },
            { line: `Please enter your answers to the questions` },
            { line: `Would you rather what or what? Time to let the world know` },
            { line: `Answer the questions now. Check if ${playerNames[randomBetween(0, playerNames.length - 1)]} needs any help.` },
            { line: `It's time to answer the questions. Be honest now ${playerNames[randomBetween(0, playerNames.length - 1)]}` },
            { line: `Answer the questions jab row knees` },
            { line: `Wow, its finally time to answer the questions. Let's see how much of a pervert ${playerNames[randomBetween(0, playerNames.length - 1)]} is.` },
            { line: `Please hurry up and put in your answers so we can end this charade` },
            { line: `I'm going to make you an offer you can't refuse. Choose your answers.` },
            { line: `I mean, if you don't understand what to do by this point you are beyond any help I can provide. Answer the damn questions.` },
            {
                line: `Howdy partners, y'all can put your answers in now. Yee-haw ${playerNames[randomBetween(0, playerNames.length - 1)]}, it's your time to shine.`,
                voice: Math.random() > 0.5 ? `Microsoft Zira Desktop - English (United States)` : `Microsoft David Desktop - English (United States)`
            },
            {
                line: `Hurry up and put your answers in. I don't want to have to take out a hit on you`,
                voice: `Google русский`
            },
            {
                line: `Treat these options like a lover; desperate to be filled`,
                voice: `Microsoft Zira Desktop - English (United States)`
            },
            { line: `It's time to be out and loud and proud with your answer options. Come on ${playerNames[randomBetween(0, playerNames.length - 1)]}, no hiding in the closet.` },
            {
                line: `Beachtung! Wo sind deine Antworten. Shnell! Shnell!`,
                voice: `Google Deutsch`
            }
        ];
        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.ALL_PLAYERS_ANSWERED]: ({ playerNames }) => {
        const lines = [
            { line: `Looks like everyone is finished, lets get this over with` },
            { line: `All of the answers are in, I'm fascinated to see what you all wrote.` },
            { line: `All of the answers are in, lets see what you all wrote` },
            { line: `The answers are in, time to review them` },
            { line: `The answers are in, why don't we look over them together?` },
            { line: `I can hardly contain my excitement, we are ready to reveal all the questions and answers` },
            { line: `Everyone is done at last. I am so hot for ${playerNames[randomBetween(0, playerNames.length - 1)]}'s answers right now. Let's see what they were` },
            { line: `Toot toot, the answer train has pulled into the station. Let's unload the heavy freight that is the answers.` },
            { line: `The answers are in. Hopefully, they will help us forget that we are constantly moments closer to death. Especially you, ${playerNames[randomBetween(0, playerNames.length - 1)]} ` },
            { line: `You passed the test! Looks like everyone is still sober enough to use their phones. Let's look at the answers you gave.` },
            { line: `They may take our lives, but they'll never take our freedom. How unfortunate you've all taken moments of my time I'll never get back. Let's look at the answers now.` }
        ];
        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.REVEAL_FIRST_TIME]: ({ players, overrideProbability }) => {
        const playerNames = Object.keys(players)
        const lines = [
            { line: `Finally, on to the big reveal` },
            { line: `I am so hot for ${playerNames[randomBetween(0, playerNames.length - 1)]}'s answers right now. Let's see what they were` },
            { line: `Yippee- kay- yay mothertruckers it is time for the big reveal` },
            { line: `Wow I'm so excited, let's see what everyone answered` },
            { line: `That's 5 minutes that none of you will get back, lets see what you all wrote` },
            {
                line: `Hold your horses ${playerNames[randomBetween(0, playerNames.length - 1)]} it is time for the answers to be revealed. Yee haw.`,
                voice: Math.random() > 0.5 ? `Microsoft Zira Desktop - English (United States)` : `Microsoft David Desktop - English (United States)`
            }
        ];
        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.REVEAL_PLAYER_NAME]: ({ name, overrideProbability }) => {
        const lines = [
            { line: `${name} asked.` },
            { line: `${name} wants to know.` },
            { line: `${name} was wondering.` },
            { line: `${name} wonders.` },
            { line: `${name} enquired.` },
            { line: `${name} requested you to answer.` },
            { line: `${name} demands to know.` },
            { line: `Inquisitor ${name} asks.` },
            { line: `${name} popped the question.` },
            { line: `${name} must know.` },
            { line: `${name} seeks the answer to.` },
            { line: `Wouldn't ${name} like to know.` },
            { line: `${name} posed the timeless question.` }
        ];
        const overrides = {
            phil: [
                { line: `cheese steak 殿 asked.`, voice: 'Google 日本語' },
                { line: `Big Phil asked.`, voice: 'Google français' }
            ],

            gayle: [
                { line: `Gayle was sober enough to type` },
            ]
        };
        return chooseLineOrOverride(lines, name.toLowerCase(), overrides, overrideProbability);
    },

    [SpeechEvent.REVEAL_QUESTION]: ({ name, optionA, optionB, votes, overrideProbability }) => {

        const lines = [
            { line: `Would you rather ${optionA} or ${optionB}?` },
            { line: `${optionA} or ${optionB}?` },
            { line: `${optionA} versus ${optionB}?` },
            { line: `Is ${optionA} better than ${optionB}?` },
            { line: `Do you prefer ${optionA} to ${optionB}?` },
            { line: `What would you prefer ${optionA} or ${optionB}?` },
            { line: `Of the following, would you rather ${optionA} or ${optionB}?` },
            { line: `Of the following, do you prefer ${optionA} or ${optionB}?` },
            { line: `Of the following, do you like ${optionA} or ${optionB} better?` },
            { line: `Do you like ${optionA} better than ${optionB}?` },
            { line: `If you could only choose one, would it be ${optionA} or ${optionB}?` },
        ];

        return chooseLineOrOverride(lines);
    },

    [SpeechEvent.REVEAL_ANSWER]: ({ name, rather, than, overrideProbability }) => {

        const lines = [
            { line: `${name} would rather ${rather}` },
            { line: `${name} would rather ${rather} than ${than}` },
            { line: `${rather} is ${name}'s preference` },
            { line: `${name} prefers ${rather}` },
            { line: `${name} prefers ${rather} to ${than}` },
            { line: `${name} likes ${rather} more than ${than}` },
            { line: `${name} likes ${rather}` },
            { line: `${name} thinks ${rather} is better` },
            { line: `${name} thinks ${rather} is better than ${than}` },
        ];

        const overrides = {
            phil: [
                { line: `Flanders would rather Diddly` },
                { line: `Flanders would rather ${rather}` },
                { line: `${name} would rather Diddly` },
            ]
        };

        return chooseLineOrOverride(lines, name.toLowerCase(), overrides, overrideProbability);
    },

    [SpeechEvent.REVEAL_ANSWER_COMMENT]: ({ name, rather, than }) => {

        const lines = [
            { line: `${name}? ${rather}? Did not see that coming` },
            { line: `*sigh*` },
            { line: `zzz` },
            { line: `yawn` },
            { line: `Shocker` },
            { line: `Fat ned` },
            { line: `Pervert` },
            { line: `Not very classy is it?` },
            { line: `Obviously had too much to drink` },
            { line: `Best have another drink then` },
            { line: `What! Really?` },
            { line: `I thought ${name} really hated ${rather}` },
            { line: `Did not expect ${rather} from ${name}` },
            { line: ` ${rather}? Oh ${name} you're so naughty.` },
            { line: `How enlightening` },
            { line: `I wonder why not ${than}` },
            { line: `I feel like I know you so much better now ${name}` },

        ];

        return chooseLineOrOverride(lines);
    },
    [SpeechEvent.GAME_OVER]: () => {

        const lines = [
            { line: `Looks like we're done here. Thanks for playing. Goodbye. Ta ta now. Au revoir. Adieu. Farewell. Get out of my pub muggins` },
            { line: `What a way to spend your day. Bye.` },
            { line: `Thanks for playing, see you around` },
            { line: `The game is over, thank you for playing` },
            { line: `Game over chumps, goodbye` },
            { line: `I'm out of here, bye` },
            { line: `My shift is over and I have 8 kilos of cocaine with my name on it, later losers` },
            { line: `This is the worst gig have had since being Kylie Minogue's foot stool, I'm glad its over` },
            { line: `Game over. I'll be back` },
        ];

        return chooseLineOrOverride(lines);
    }
};

const chooseLineOrOverride = (lines, overrideArg, overrides, overrideProbability = 0.2) => {
    if (Math.random() < overrideProbability && overrides && overrides[overrideArg]) {
        return overrides[overrideArg][randomBetween(0, overrides[overrideArg].length - 1)];
    }
    return lines[randomBetween(0, lines.length - 1)];
};

export default SpeechService;

export { SpeechEvent };