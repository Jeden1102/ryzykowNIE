import firebase from "firebase/app";
import "firebase/database";

const config = {
    databaseURL: "https://ryzyk-fizyk-default-rtdb.europe-west1.firebasedatabase.app/",
    appId: "1:73965917449:web:4cf3ff8a2902742d132fd8",
    apiKey: "AIzaSyBVdymBNVGw-dmPD42lJu5cYNEmAZdFyfk",
    authDomain: "ryzyk-fizyk.firebaseapp.com",
    projectId: "ryzyk-fizyk",
    storageBucket: "ryzyk-fizyk.appspot.com",
    messagingSenderId: "384717397570",
    appId: "1:384717397570:web:1a73657f9f20e5379417db"
};

firebase.initializeApp(config);

export default firebase.database();