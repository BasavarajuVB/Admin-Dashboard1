// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAEZMcO5Gaq6FKEo_Za2tNHHvfKsDlGTzA",
  authDomain: "web3news-dca1f.firebaseapp.com",
  databaseURL: "https://web3news-dca1f-default-rtdb.firebaseio.com",
  projectId: "web3news-dca1f",
  storageBucket: "web3news-dca1f.firebasestorage.app",
  messagingSenderId: "501919675960",
  appId: "1:501919675960:web:85868df5ee8ef1a77858cd",
  measurementId: "G-NFVZBFX2QE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };


