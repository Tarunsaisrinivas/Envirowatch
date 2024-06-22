import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA4gs7F0wVl-AmhRDXGTxTt0SMOxSr9kMw",
  authDomain: "mediaupload-14dda.firebaseapp.com",
  projectId: "mediaupload-14dda",
  storageBucket: "mediaupload-14dda.appspot.com",
  messagingSenderId: "1026119572460",
  appId: "1:1026119572460:web:e958ec849c58a4f3f73ec9",
  measurementId: "G-96ETKK0TS1"
  };


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export { firebase }