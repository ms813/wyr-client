import React, {useEffect, useState} from 'react';
import Lobby from '../components/Lobby';
import FirebaseService from '../firebase/firebase.service';

const Player = ({gameId, playerName}) => {

    const [players, setPlayers] = useState({});
    const [questions, setQuestions] = useState({});
    const [hostState, setHostState] = useState('');

    useEffect(() => {
        const ref = new FirebaseService().getGameRef(gameId);

        ref.on('value', (snapshot) => {
            const snapshotValue = snapshot.val();
            console.debug('Player snapshot update', snapshotValue);
            setPlayers(snapshotValue.players);
            setQuestions(snapshotValue.questions);
            setHostState(snapshotValue.hostState);
        });

        return ref.off;
    }, []);

    const contentSwitch = () => {
        const lobby = <Lobby gameId={gameId} players={players} isHost={false} />;
        return lobby;
    };

    return (
        <div id="player-parent">
            {contentSwitch()}
        </div>
    );
};

export default Player;