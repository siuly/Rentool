// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import {initializeApp } from 'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js';
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

class User{
  constructor(fname, lname, email, pswd){
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.pswd = pswd;
}
toString(){
  return `Name: ${this.fname}  ${this.lname}, Email: ${this.email}, Password: ${this.pswd}`;
}
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

// Test user information. This information should be from user input
const  email = 'test@gmail.com';
const password = '12345678';

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('user: ', user);
    console.log("uid = :", user.uid);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log('errorCode: ', errorCode);
    const errorMessage = error.message;
    console.log('errorMessage: ', errorMessage);
    // ..
  });

  let firestore = firebase.firestore()
  //Variable to access database collection
  const db = firestore.collection("Users")

  //Get information from form
  let submit = document.getElementById("sbtn")

  //Create Event  Listener to allow form submission

  submit.addEventListener("click", (e) =>{
    //Prevent Default Form submission behavior
    e.preventDefault()

    //get values of the form
    let firstName = submit.querySelector("#fname");
    let lastName = submit.querySelector("#lname");
    let email = submit.querySelector("#email");
    let password = submit.querySelector("#pswd");

    const user = new User(firstName.value, lastName.value, email.value, password.value);
    
    console.log(user.toString());//will print the  information that we get 
    //save form data to firebase
    db.doc().set({
      fname: firstName,
      lname: lastName,
      email: email,
      pswd: password
    }).then(()=>{
      console.log("Data saved")
    }).catch((error)=>{
      console.log(error)
    })
  } );
