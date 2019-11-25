import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Lobby from '../components/Lobby';
import HostState from './HostState';
import FirebaseContext from '../config/FirebaseContext';

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
            setHostState(snapshotValue.hostState);
        });

        return ref.off;
    }, []);

    useEffect(() => {
        switch (hostState) {
            case HostState.WAITING_FOR_QUESTIONS:
                console.debug('Host state set to ', hostState);
                const ref = firebase.getGameRef(gameId);
        }
    }, [hostState]);

    const contentSwitch = (hostState) => {
        const lobby = <Lobby gameId={gameId} players={players} isHost onClick={setHostState} />;
        switch (hostState) {
            case HostState.HOST_LOBBY:
                return lobby;
            case HostState.WAITING_FOR_QUESTIONS:
                return <div>lul</div>;
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
