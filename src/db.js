// Conveniently import this file anywhere to use db

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD7YVazsYgL0o1RTbLhPDojYl8wIr_TM3k",
    authDomain: "prueba1-76aa8.firebaseapp.com",
    projectId: "prueba1-76aa8",
    storageBucket: "prueba1-76aa8.appspot.com",
    messagingSenderId: "1067643526220",
    appId: "1:1067643526220:web:3f5f7a763947bb9183a8e9"
  };

var app = firebase.initializeApp(firebaseConfig)

export const db = app.firestore()
export const storage = app.storage()

// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
