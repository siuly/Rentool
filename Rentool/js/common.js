import { signOut, movePageTo, PATHS_PAGES } from './util.js';



// SIDE MENU
const toggle = document.getElementById('toggle');
const sidemenu = document.getElementById('menu');

toggle.onclick = function() {
  sidemenu.classList.toggle('active');
};


document.getElementById('sign-out').addEventListener('click', (e) => {
  e.preventDefault();
  signOut();
  movePageTo(PATHS_PAGES.HOME);
});