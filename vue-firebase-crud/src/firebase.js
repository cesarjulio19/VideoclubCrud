// This import loads the firebase namespace.
import firebase from '@firebase/app';

// These imports load individual services into the firebase namespace.
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import '@firebase/firestore';


let config = {
    apiKey: "AIzaSyCClpzAwQKrCE7MUBt1U79mwKnkVSanwko",
    authDomain: "videoclub-firebase.firebaseapp.com",
    databaseURL: "https://videoclub-firebase-default-rtdb.firebaseio.com",
    projectId: "videoclub-firebase",
    storageBucket: "videoclub-firebase.appspot.com",
    messagingSenderId: "514182970135",
    appId: "1:514182970135:web:da5d6cad66b33afe6b5552",
    measurementId: "G-R2CFW7RSD2"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  export default firebase.database();
