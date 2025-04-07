// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKBYVE27IYkqNWQIXN48u984smAzpt2qY",
  authDomain: "fuel-management-analysis.firebaseapp.com",
  projectId: "fuel-management-analysis",
  storageBucket: "fuel-management-analysis.firebasestorage.app",
  messagingSenderId: "393413138174",
  appId: "1:393413138174:web:f727f243c435b31fad77af",
  measurementId: "G-MBR4NXQ1X9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth, collection, addDoc}