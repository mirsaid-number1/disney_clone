import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB1VivT6fkSAw8bQM4fvHEOubrWQwdVYDA",
  authDomain: "disney-51dc8.firebaseapp.com",
  projectId: "disney-51dc8",
  storageBucket: "disney-51dc8.appspot.com",
  messagingSenderId: "879593130117",
  appId: "1:879593130117:web:0465961f8ee4b2ff1101ec",
  measurementId: "G-TFV7NW61G0",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
