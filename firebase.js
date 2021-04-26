import firebase from "firebase"
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyC8EUNLwWUuSt_llXH8tVDBOo-4S_0k7aY",
    authDomain: "sell-4-u.firebaseapp.com",
    projectId: "sell-4-u",
    storageBucket: "sell-4-u.appspot.com",
    messagingSenderId: "283961810750",
    appId: "1:283961810750:web:c261a371a1d665cc01d66f"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);

} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };