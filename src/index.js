import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import TestWrapper from './test/TestWrapper';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import FontAwesomeConfig from './config/FontAwesomeConfig';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

FontAwesomeConfig();

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/test">
                <TestWrapper />
            </Route>
            <Route path="/">
                <App />
            </Route>
        </Switch>
    </Router>,
    document.getElementById('root')
);
