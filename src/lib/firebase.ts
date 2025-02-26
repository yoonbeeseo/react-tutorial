import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDvVSrLxZ0rKeOkmuKezk46FS9YgRYdjc",
  authDomain: "data101-c26e2.firebaseapp.com",
  projectId: "data101-c26e2",
  storageBucket: "data101-c26e2.firebasestorage.app",
  messagingSenderId: "70432081845",
  appId: "1:70432081845:web:8fc95f62301dd8e699fbfc",
  measurementId: "G-76N9NMW7FT",
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore
export const dbService = firebase.firestore()
export { firebase }
