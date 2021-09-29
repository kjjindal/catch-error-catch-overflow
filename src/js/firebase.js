import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDyv8Z6p-_xqXMjpKUqM8CVFmSlVzJwT_8",
    authDomain: "catchoverflow.firebaseapp.com",
    projectId: "catchoverflow",
    storageBucket: "catchoverflow.appspot.com",
    messagingSenderId: "337128434812",
    appId: "1:337128434812:web:3c77cd419151fa70136df9",
    measurementId: "G-CY2ZXJSXRG"
  };

  const firebaseapp=firebase.initializeApp(firebaseConfig);
  const db=firebaseapp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export default db;
  export {auth,provider}