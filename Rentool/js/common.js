import { signOut, movePageTo, PATHS_PAGES, readUserId } from './util.js';
import { RentoolHeader } from '../js/components/RentoolHeader.js';
import { RentoolFooter } from '../js/components/RentoolFooter.js';



// SIDE MENU
const toggle = document.getElementById('toggle');
const sidemenu = document.getElementById('menu');

if (toggle !== null && sidemenu !== null) {
  toggle.onclick = function() {
    sidemenu.classList.toggle('active');
  };
}





// Return page icon
const pageReturnButtonEl = document.getElementById('page-return-button');
if (pageReturnButtonEl !== null) {
  pageReturnButtonEl.addEventListener('click', () => window.history.back());
}


window.customElements.define('rentool-header', RentoolHeader);
window.customElements.define('rentool-footer', RentoolFooter);

// Header Menu [Sign-in] [Sign-out]
const signStatusEl = document.getElementById('sign-status');
if (signStatusEl !== null) {

  const signInOutMenuItemEl = signStatusEl.children[0];

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
}