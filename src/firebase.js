import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBWYb2__HbYJqLIMRNlRD8BbbyQL6pKNJM",
    authDomain: "study-link-v2.firebaseapp.com",
    databaseURL: "https://study-link-v2.firebaseio.com",
    projectId: "study-link-v2",
    storageBucket: "study-link-v2.appspot.com",
    messagingSenderId: "889070758962",
    appId: "1:889070758962:web:9d675466120941c819a02b",
    measurementId: "G-5EPFMVVYG4"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app as firebase, db };