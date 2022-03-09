// Import the functions you need from the SDKs you need

import { GET_PARAMS, movePageTo, PATHS_PAGES } from './util.js';

// import {initializeApp } from 'https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js';
// import { getAuth, createUserWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import { homePage } from './util';



const firebaseConfig = {
  apiKey: 'AIzaSyA7JwpO8rrYXgeKfiokAoymg2vJia3h7Nc',
  authDomain: 'rentool-4a9e6.firebaseapp.com',
  projectId: 'rentool-4a9e6',
  storageBucket: 'rentool-4a9e6.appspot.com',
  messagingSenderId: '357202195995',
  appId: '1:357202195995:web:4a7e7342acf44dd4f4eabe',
  measurementId: 'G-B5QXJNMD7M'
};

class User {
  constructor(fname, lname, phone, email, pswd) {
    this.fname = fname;
    this.lname = lname;
    this.phone = phone;
    this.email = email;
    this.pswd = pswd;
  }
  toString() {
    return 'Name: ${this.fname}  ${this.lname}, Email: ${this.email}, Phone Number: ${this.phone}, Password: ${this.pswd}';
  }
}


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

function homePage(){
  window.location.href = 'home.html';
}

function comparepswd() {
  let pass = document.getElementById('pswd');
  let pass2 = document.getElementById('cpswd');

  if (pass.value != pass2.value) {
    alert('Yours passwords do not match');
  } else {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('pswd').value = '';
    document.getElementById('cpswd').value = '';
    alert('Account created');

    homePage();

  }
}
// Test user information. This information should be from user input
// const  email = 'test@gmail.com';
// const password = '12345678';


let firestore = firebase.firestore();
//Variable to access database collection
const db = firestore.collection('Users');

//Get information from for
let form = document.getElementById('sign-up');
let submitbtn = document.getElementById('sbtn');

//Create Event  Listener to allow form submission
submitbtn.addEventListener('click', (event) => {

  //Prevent Default Form submission behavior
  event.preventDefault();

  //get values of the form
  let firstName = form.querySelector('#fname');
  let lastName = form.querySelector('#lname');
  let phonen = form.querySelector('#phone');
  let email = form.querySelector('#email');
  let password = form.querySelector('#pswd');

  const user = new User(firstName.value, lastName.value, email.value, password.value);

  comparepswd();

  console.log(user.toString()); //will print the  information that we get 
  //save form data to firebase
  db.doc(firstName.value + email.value).set({
    fstname: firstName.value,
    lstname: lastName.value,
    phone: phonen.value,
    email: email.value,
    pswd: password.value
  }).then(() => {
    console.log('Data saved');
  }).catch((error) => {
    console.log(error);
  });

});
let cancelBtn = document.getElementById('cbtn');

cancelBtn.addEventListener('click', () =>{

  console.log("you clicked");
  movePageTo(PATHS_PAGES.SIGN_IN);

});