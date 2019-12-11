import React, {useContext, useEffect, useState} from 'react';
import HostLobby from './HostLobby';
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
                return ref.off('value');
            }
            return setPlayers(snapshot.val().players || {});
        });
        return () => ref.off('value');

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

    const again = () => {
        setHostState(HostState.HOST_LOBBY);
        firebase.getPlayersRef(gameId).once('value', snapshot => {
            snapshot.forEach(child => {
                const {name, avatarUri} = child.val();
                child.ref.set({
                    name,
                    avatarUri,
                    state: PlayerState.LOBBY
                });
            });
        });
    };

    const contentSwitch = (hostState) => {
        const lobby = <HostLobby gameId={gameId} players={players} onClick={startGame} errorText={errorText} />;
        switch (hostState) {
            case HostState.HOST_LOBBY:
                return lobby;
            case HostState.WAITING_FOR_QUESTIONS:
                return <HostWaitingForQuestions players={players} setHostState={setHostState} />;
            case HostState.WAITING_FOR_ANSWERS:
                return <HostWaitingForAnswers players={players} setHostState={setHostState} />;
            case HostState.REVEAL:
                return <HostReveal players={players} setHostState={setHostState} />;
            case HostState.GAME_OVER:
                return <HostGameOver onAgain={again} />;
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

export default Host;
