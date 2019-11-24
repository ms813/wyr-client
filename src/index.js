import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const firebaseConfig = {
    apiKey: "redacted",
    authDomain: "would-you-rather-24fbe.firebaseapp.com",
    databaseURL: "https://would-you-rather-24fbe.firebaseio.com",
    projectId: "would-you-rather-24fbe",
    storageBucket: "would-you-rather-24fbe.appspot.com",
    messagingSenderId: "625076345811",
    appId: "1:625076345811:web:e1b9f3b13721d275dced26"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);