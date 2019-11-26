import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Lobby from '../components/Lobby';
import HostState from './HostState';
import FirebaseContext from '../config/FirebaseContext';
import HostWaitingForQuestions from './HostWaitingForQuestions';
import PlayerState from '../player/PlayerState';

const Host = ({gameId}) => {
    const [players, setPlayers] = useState({});
    const [questions, setQuestions] = useState({});
    const [hostState, setHostState] = useState('');
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const ref = firebase.getGameRef(gameId);

        ref.on('value', (snapshot) => {
            const snapshotValue = snapshot.val();
            console.debug('Host snapshot update', snapshotValue);
            setPlayers(snapshotValue.players);
            setQuestions(snapshotValue.questions);
        });
        return ref.off;

    }, []);

    useEffect(() => {
        switch (hostState) {
            case HostState.WAITING_FOR_QUESTIONS:
                console.debug('Host state set to ', hostState);
                firebase.getGameRef(`${gameId}/players`).ref.once('value', snapshot => {
                    snapshot.forEach(child => {
                        child.ref.update({
                            state: PlayerState.WRITING_QUESTION
                        });
                    });
                });
                break;
            default:
                break;
        }
    }, [hostState]);

    const contentSwitch = (hostState) => {
        const lobby = <Lobby gameId={gameId} players={players} isHost onClick={setHostState} />;
        console.log('Host content switch', hostState);
        switch (hostState) {
            case HostState.HOST_LOBBY:
                return lobby;
            case HostState.WAITING_FOR_QUESTIONS:
                return <HostWaitingForQuestions players={players} questions={questions} onClick={setHostState} />;
            case HostState.WAITING_FOR_ANSWERS:
                return <div>Waiting for answers</div>;
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
