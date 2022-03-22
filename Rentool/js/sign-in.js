import { signInEmailWithPassword } from './firebase.js';
import { movePageTo, PATHS_PAGES, SaveUserId, DURATION_TOAST_DISPLAY } from './util.js';


const login = document.getElementById('sign-in-btn');

login.addEventListener('click', async (event) => {
  event.preventDefault();

  const userEmail = document.getElementById('email').value.trim();
  const userPassword = document.getElementById('pswd').value.trim();
  if (userEmail === '' || userPassword === '') {
    Toastify({
      text: 'Please fill in both input fields',
      close: true,
      gravity: 'top',
      position: 'center',
      className: 'error',
      duration: DURATION_TOAST_DISPLAY,
    }).showToast();
    return;
  }
  /**@type {string | null} */
  const userId = await signInEmailWithPassword(userEmail, userPassword);

  if (userId === null) {
    Toastify({
      text: `ERROR: ${error}`,
      close: true,
      gravity: 'top',
      position: 'center',
      className: 'error',
      duration: 300000,
    }).showToast();
    return;
  }

  SaveUserId(userId);
  Toastify({
    text: 'SignIn Success',
    close: true,
    gravity: 'top',
    position: 'center',
    className: 'info',
    duration: 3000,
  }).showToast();
  await window.history.back();
  window.addEventListener('popstate', () => {
    console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state));
    if (!document.location.includes('view')) {
      movePageTo(PATHS_PAGES.HOME);
    }
  });
  // movePageTo(PATHS_PAGES.HOME);
});

let signUp = document.getElementById('cbtn');
signUp.addEventListener('click', () => {
  movePageTo(PATHS_PAGES.SIGN_UP);
});

let rememberMyEmailCheckbox = document.getElementById('autocomplete');
let emailFiled = document.getElementById('email');

rememberMyEmailCheckbox.addEventListener('click', ()=>{
  if (rememberMyEmailCheckbox.checked){
      if( emailFiled.hasAttribute('autocomplete') == 'on'){  
      } else{
        emailFiled.setAttribute('autocomplete', 'on');
      }
  }else{
    emailFiled.setAttribute('autocomplete', 'off');
  }
});