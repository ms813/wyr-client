import React, {useContext, useEffect, useState} from 'react';
import Lobby from '../components/Lobby';
import PropTypes from 'prop-types';
import HostState from './HostState';
import FirebaseContext from '../FirebaseContext';

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
            case HostState.WAITING_FOR_ANSWERS:
                const ref = firebase.getGameRef(gameId);
        }
    }, [hostState]);

    const contentSwitch = (hostState) => {
        const lobby = <Lobby gameId={gameId} players={players} isHost={true} onClick={setHostState} />;
        switch (hostState) {
            case HostState.HOST_LOBBY:
                return lobby;
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