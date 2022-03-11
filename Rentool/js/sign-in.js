import { signInEmailWithPassword } from './firebase.js';
import { GET_PARAMS, movePageTo, PATHS_PAGES } from './util.js';


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

let signUp = document.getElementById('cbtn');
signUp.addEventListener('click', () =>{
  movePageTo(PATHS_PAGES.SIGN_UP);

});