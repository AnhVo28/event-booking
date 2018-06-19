import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyA_ROOlu963cXh1vJADRTdKz6liH0aO4Bg',
    authDomain: 'reevent-207107.firebaseapp.com',
    databaseURL: 'https://reevent-207107.firebaseio.com',
    projectId: 'reevent-207107',
    storageBucket: 'reevent-207107.appspot.com',
    messagingSenderId: '242117553242'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;