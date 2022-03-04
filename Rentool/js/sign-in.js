import { signInEmailWithPassword } from './firebase.js';


const login = document.getElementById('sign-in-btn');
let singInEmailWithPassword = '';

login.addEventListener('click', (event) => {
  event.preventDefault();

  const userEmail = document.getElementById('email').value.trim();
  const userPassword = document.getElementById('pswd').value.trim();
  if (userEmail === '' || userPassword === '') {
    alert('Please fill in both input fields');
    return;
  }


  signInEmailWithPassword(userEmail, userPassword);


  // singInEmailWithPassword(userEmail, userPassword);

  //  alert(`user email is ${userEmail} and user password is ${userPassword}`);
});