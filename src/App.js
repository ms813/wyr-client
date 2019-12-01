import React, {Fragment, useContext, useState} from 'react';
import './App.css';
import CreateOrJoinForm from './components/CreateOrJoinForm';
import Host from './host/Host';
import Player from './player/Player';
import FirebaseContext from './firebase/FirebaseContext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core';
import TestWrapper from './test/TestWrapper';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Box from '@material-ui/core/Box';

function App() {
    const firebase = useContext(FirebaseContext);

    const [gameId, setGameId] = useState('');
    const [playerName, setPlayerName] = useState('');

    const [clientType, setClientType] = useState('');
    const [gameIdError, setGameIdError] = useState('');
    const [playerNameError, setPlayerNameError] = useState('');

    function isPlayerNameUnique(playerName, players) {
        return !Object.keys(players).find((name) => name === playerName);
    }

    const clearErrors = () => {
        setPlayerNameError('');
        setGameIdError('');
    };

    const joinGame = () => {
        clearErrors();

        if (!gameId) {
            setGameIdError('Please enter a room name');
            return;
        }

        if (!playerName) {
            setPlayerNameError('Please enter a name');
            return;
        }

        console.log(`Attempting to join game ${gameId}`);
        firebase.getGameRef(gameId).once('value').then((snapshot) => {
            const snapshotValue = snapshot.val();
            if (snapshotValue) {
                if (!isPlayerNameUnique(playerName, snapshotValue.players || [])) {
                    console.warn(`Failed to join game ${gameId} as player ${playerName}, because a player already exists with that name`);
                    return setPlayerNameError(`That name is already taken in ${gameId}, please choose another!`);
                }
                setClientType('player');
                firebase.addPlayerToGame(gameId, playerName);
                return setGameId(gameId);
            } else {
                console.warn(`Failed to join game ${gameId}, because it does not exist`);
                return setGameIdError(`Failed to join game ${gameId}, because it does not exist`);
            }
        });
    };

    const createGame = () => {
        clearErrors();
        console.log('Creating new game...');
        firebase.createGame((gameId) => {
            console.log('New game successfully created: ', gameId);
            firebase.getGameRef(gameId).once('value').then((snapshot) => {
                if (snapshot.val()) {
                    setGameId(gameId);
                    setClientType('host');
                } else {
                    const msg = `Failed to join game ${gameId}, because it does not exist`;
                    console.warn(msg);
                    setGameIdError(msg);
                }
            });
        });
    };

    const contentSwitch = () => {
        if (clientType === 'host') {
            return <Host gameId={gameId} />;
        }
        if (clientType === 'player') {
            return <Player gameId={gameId} playerName={playerName} />;
        }
        return <CreateOrJoinForm
            setGameId={setGameId}
            setPlayerName={setPlayerName}
            joinGame={joinGame}
            createGame={createGame}
            gameIdError={gameIdError}
            playerNameError={playerNameError}
        />;
    };

    const appBar = (gameId, clientType) => {
        let clientTypeFragment;
        if (gameId && clientType) {
            if (clientType === 'player') {
                clientTypeFragment = <Typography variant="subtitle2">Player in <i>{gameId}</i></Typography>;
            } else if (clientType === 'host') {
                clientTypeFragment = <Typography variant="subtitle2">Host for <i>{gameId}</i></Typography>;
            }
        }
        return (
            <Box display="flex" flexDirection="column">
                <Typography variant="h6" className={classes.title}> Would you rather?</Typography>
                {clientTypeFragment}
            </Box>
        );
    };

    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <img src="favicon.ico" alt="Logo" className={classes.icon} />
                        {appBar(gameId, clientType)}
                    </Toolbar>
                </AppBar>
            </div>
            <Router>
                <Switch>
                    <Route path="/test">
                        <TestWrapper />
                    </Route>
                    <Route path="/">
                        {contentSwitch()}
                    </Route>
                </Switch>
            </Router>
        </Fragment>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    icon: {
        marginRight: theme.spacing(2)
    }
}));

export default App;
