import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyAEoF4YSWoj98XV8uHAucwmoK47viRXySc",
  authDomain: "mydatabase-19c2e.firebaseapp.com",
  databaseURL: "https://mydatabase-19c2e-default-rtdb.firebaseio.com",
  projectId: "mydatabase-19c2e",
  storageBucket: "mydatabase-19c2e.firebasestorage.app",
  messagingSenderId: "1055071853451",
  appId: "1:1055071853451:web:e4a4e94e3ad5ae53c02d8e",
  measurementId: "G-MH4XWPK7LK"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);