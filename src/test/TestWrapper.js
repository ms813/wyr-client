import React, {useContext, useEffect, useState} from 'react';
import Lobby from '../components/Lobby';
import FirebaseContext from '../config/FirebaseContext';

const TestWrapper = ({gameId = 'angry-goat-2'}) => {
    const [players, setPlayers] = useState({});
    const [questions, setQuestions] = useState({});
    const [hostState, setHostState] = useState('');
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const ref = firebase.getGameRef(gameId);

        ref.on('value', (snapshot) => {
            const snapshotValue = snapshot.val();
            if (snapshotValue) {
                console.debug('Host snapshot update', snapshotValue);
                setPlayers(snapshotValue.players);
                setQuestions(snapshotValue.questions);
                setHostState(snapshotValue.hostState);
            }
        });

        return ref.off;
    }, []);

    // const players = {'123': 'Matt', '456': 'Flaps'};
    // const questions = {
    //     'qid123': {
    //         options: {
    //             a: "Eat 1000 apples",
    //             b: "Chop a grey ham"
    //         },
    //         player: "Matt"
    //     },
    //     'qid456': {
    //         options: {
    //             a: "Tea",
    //             b: "Coffee"
    //         },
    //         player: "Flaps"
    //     },
    // };

    // return <HostWaitingForQuestions players={players} questions={questions}/>;
    return <Lobby players={players} gameId={gameId} isHost />;
};

export default TestWrapper;