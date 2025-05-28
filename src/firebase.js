// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBElOx48Lzc6AQaf4CdexsOgaEPEkgTIMI",
  authDomain: "fruitswipe-01.firebaseapp.com",
  databaseURL: "https://fruitswipe-01-default-rtdb.firebaseio.com",
  projectId: "fruitswipe-01",
  storageBucket: "fruitswipe-01.appspot.com",  // ← use ".appspot.com" not ".storage.app"
  messagingSenderId: "861482168289",
  appId: "1:861482168289:web:9da3b3cbc93a455f5faca0",
  measurementId: "G-KGYC5JJ7Y0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
