import { signInEmailWithPassword } from './firebase.js';
import { movePageTo, PATHS_PAGES, SaveUserId } from './util.js';


const login = document.getElementById('sign-in-btn');

login.addEventListener('click', async (event) => {
  event.preventDefault();

  const userEmail = document.getElementById('email').value.trim();
  const userPassword = document.getElementById('pswd').value.trim();
  if (userEmail === '' || userPassword === '') {
    alert('Please fill in both input fields');
    return;
  }
  /**@type {string | null} */
  const userId = await signInEmailWithPassword(userEmail, userPassword);

  if (userId === null) {
    alert(`ERROR: ${error}`);
    return;
  }

  SaveUserId(userId);
  alert('SignIn Success');
  await window.history.back();
  window.addEventListener("popstate", () =>{
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    if (!document.location.includes('view')){
      movePageTo(PATHS_PAGES.HOME);
    }
  })
    // movePageTo(PATHS_PAGES.HOME);
});

let signUp = document.getElementById('cbtn');
signUp.addEventListener('click', () => {
  movePageTo(PATHS_PAGES.SIGN_UP);

});