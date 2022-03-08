import { signOut, movePageTo, PATHS_PAGES, readUserId } from './util.js';



// SIDE MENU
const toggle = document.getElementById('toggle');
const sidemenu = document.getElementById('menu');

toggle.onclick = function() {
  sidemenu.classList.toggle('active');
};

const signInOutMenuItemEl = document.getElementById('sign-status').children[0];
if (readUserId() === null) {
  signInOutMenuItemEl.textContent = 'Sign In';
  signInOutMenuItemEl.href = `./${PATHS_PAGES.SIGN_IN}`;
} else {
  // Add sign-out function to sign-out menu
  document.getElementById('sign-out').addEventListener('click', (e) => {
    e.preventDefault();
    signOut();
    movePageTo(PATHS_PAGES.HOME);
  });
}