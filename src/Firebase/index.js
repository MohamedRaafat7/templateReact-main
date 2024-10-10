// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSSWwMgXYSXjWPeFFpeZd8JYSPLYNrbWw",
  authDomain: "ecommarce-6dbd9.firebaseapp.com",
  projectId: "ecommarce-6dbd9",
  storageBucket: "ecommarce-6dbd9.appspot.com",
  messagingSenderId: "63303223363",
  appId: "1:63303223363:web:0499a1625a1ee51b176cf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
