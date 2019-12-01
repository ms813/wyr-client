import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Lobby from '../components/Lobby';
import HostState from './HostState';
import FirebaseContext from '../firebase/FirebaseContext';
import HostWaitingForQuestions from './HostWaitingForQuestions';
import PlayerState from '../player/PlayerState';
import HostWaitingForAnswers from './HostWaitingForAnswers';
import HostReveal from './HostReveal';
import HostGameOver from './HostGameOver';
import {MIN_PLAYERS} from '../config/Utils';

const Host = ({gameId}) => {
    const [players, setPlayers] = useState({});
    const [hostState, setHostState] = useState(HostState.HOST_LOBBY);
    const [errorText, setErrorText] = useState('');
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const ref = firebase.getGameRef(gameId);

        ref.on('value', (snapshot) => {
            if (!snapshot || !snapshot.val()) {
                return ref.off();
            }
            return setPlayers(snapshot.val().players);
        });
        return ref.off;

    }, [firebase, gameId]);

    useEffect(() => {
        const updateAllPlayersState = (state) => {
            firebase.getPlayersRef(gameId).once('value', snapshot => {
                snapshot.forEach(child => {
                    child.ref.update({state});
                });
            });
        };

        switch (hostState) {
            case HostState.WAITING_FOR_QUESTIONS:
                updateAllPlayersState(PlayerState.WRITING_QUESTION);
                break;
            case HostState.WAITING_FOR_ANSWERS:
                updateAllPlayersState(PlayerState.WRITING_ANSWERS);
                break;
            case HostState.GAME_OVER:
                updateAllPlayersState(PlayerState.GAME_OVER);
                firebase.getGameRef(gameId).remove();
                break;
            default:
                break;
        }
    }, [hostState, firebase, gameId]);

    const startGame = (hostState) => {
        if (players && Object.keys(players).length >= MIN_PLAYERS) {
            setHostState(hostState);
            setErrorText('');
            console.log('Start game');
        } else {
            const errorMsg = `Need at least ${MIN_PLAYERS} players to start a game!`;
            setErrorText(errorMsg);
            console.warn(errorMsg);
        }
    };

    const contentSwitch = (hostState) => {
        const lobby = <Lobby gameId={gameId} players={players} isHost onClick={startGame} errorText={errorText} />;
        switch (hostState) {
            case HostState.HOST_LOBBY:
                return lobby;
            case HostState.WAITING_FOR_QUESTIONS:
                return <HostWaitingForQuestions players={players} setHostState={setHostState} />;
            case HostState.WAITING_FOR_ANSWERS:
                return <HostWaitingForAnswers players={players} setHostState={setHostState} />;
            case HostState.REVEAL_QUESTION:
                return <HostReveal players={players} setHostState={setHostState} />;
            case HostState.GAME_OVER:
                return <HostGameOver />;
            default:
                return lobby;
        }
    };

    return (
        <div id="host-parent">
            {contentSwitch(hostState)}
        </div>
    );
};

Host.propTypes = {
    gameId: PropTypes.string
};

export default Host;
