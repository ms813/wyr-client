import React, {useState, useEffect} from 'react';
import Lobby from '../components/Lobby';
import PropTypes from 'prop-types';
import {HostState} from '../GameState';
import FirebaseService from '../firebase/firebase.service';

const Host = ({gameId}) => {

    const [players, setPlayers] = useState({});
    const [questions, setQuestions] = useState({});
    const [hostState, setHostState] = useState('');

    useEffect(() => {
        const ref = new FirebaseService().getGameRef(gameId);

        ref.on('value', (snapshot) => {
            const snapshotValue = snapshot.val();
            console.debug('Host snapshot update', snapshotValue);
            setPlayers(snapshotValue.players);
            setQuestions(snapshotValue.questions);
            setHostState(snapshotValue.hostState);
        });

        return ref.off;
    }, []);

    const contentSwitch = (hostState) => {
        const lobby = <Lobby gameId={gameId} players={players} isHost={true} />;
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