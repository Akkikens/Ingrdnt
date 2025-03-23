// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLLtnbnNQlhhLl7Dk19dwRLCJU3NfN15U",
  authDomain: "ingrdnt-aa463.firebaseapp.com",
  projectId: "ingrdnt-aa463",
  storageBucket: "ingrdnt-aa463.firebasestorage.app",
  messagingSenderId: "515924281173",
  appId: "1:515924281173:web:6f68bce85fa9174145d1dc",
  measurementId: "G-KFBZ93EE59"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);