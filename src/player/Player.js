import React, {useContext, useEffect, useState} from 'react';
import Lobby from '../components/Lobby';
import FirebaseContext from '../FirebaseContext';

const Player = ({gameId, playerName}) => {

    const [players, setPlayers] = useState({});
    const [questions, setQuestions] = useState({});
    const [hostState, setHostState] = useState('');
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const ref = firebase.getGameRef(gameId);

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