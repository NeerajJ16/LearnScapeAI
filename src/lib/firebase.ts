// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9gQ1a6qkgmXbh8fWTZ585vDw4vutSOMQ",
  authDomain: "learnscape-bec0a.firebaseapp.com",
  projectId: "learnscape-bec0a",
  storageBucket: "learnscape-bec0a.firebasestorage.app",
  messagingSenderId: "548307882678",
  appId: "1:548307882678:web:a00e62101bbde9704ecc17",
  measurementId: "G-SJPG5HB30M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);