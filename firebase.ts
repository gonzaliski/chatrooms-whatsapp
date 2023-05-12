import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAUieuLae8pUCl1iNZLaa9RyEfJnkm8K8o",
  authDomain: "firestore-m6.firebaseapp.com",
  databaseURL: "https://firestore-m6-default-rtdb.firebaseio.com",
  projectId: "firestore-m6",
  storageBucket: "firestore-m6.appspot.com",
  messagingSenderId: "280403050599",
  appId: "1:280403050599:web:2b5ab36939851a28ab94c2",
  measurementId: "G-EDM7EJ5P92",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const rtdb = getDatabase();
