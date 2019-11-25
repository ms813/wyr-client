import React from 'react';
import FirebaseService from './firebase/firebase.service';
import * as firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: 'redacted',
    authDomain: 'would-you-rather-24fbe.firebaseapp.com',
    databaseURL: 'https://would-you-rather-24fbe.firebaseio.com',
    projectId: 'would-you-rather-24fbe',
    storageBucket: 'would-you-rather-24fbe.appspot.com',
    messagingSenderId: '625076345811',
    appId: '1:625076345811:web:e1b9f3b13721d275dced26'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const FirebaseContext = React.createContext(new FirebaseService());

export const FirebaseProvider = FirebaseContext.Provider;
export const FirebaseConsumer = FirebaseContext.Consumer;
export default FirebaseContext;