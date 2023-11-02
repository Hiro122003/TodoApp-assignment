import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC_APY2yqupAFz6Chqp4EARPiLtlb7OsyA",
  authDomain: "todoapp-assignment-564f7.firebaseapp.com",
  projectId: "todoapp-assignment-564f7",
  storageBucket: "todoapp-assignment-564f7.appspot.com",
  messagingSenderId: "55022008953",
  appId: "1:55022008953:web:27537048714e601d1572a8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;