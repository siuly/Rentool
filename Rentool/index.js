// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7JwpO8rrYXgeKfiokAoymg2vJia3h7Nc",
  authDomain: "rentool-4a9e6.firebaseapp.com",
  projectId: "rentool-4a9e6",
  storageBucket: "rentool-4a9e6.appspot.com",
  messagingSenderId: "357202195995",
  appId: "1:357202195995:web:4a7e7342acf44dd4f4eabe",
  measurementId: "G-B5QXJNMD7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);