import { fetchUserByUserId } from './firebase.js';
import { filterNotSignedInUser, setOnPageClassToMenuItem, PATHS_PAGES, readUserId } from './util.js';

filterNotSignedInUser();
setOnPageClassToMenuItem(PATHS_PAGES.USER_PROFILE);


const fullNameEl = document.getElementById('full-name');
const emailEl = document.getElementById('email');
const phoneNumberEl = document.getElementById('phone-number');
const addressEl = document.getElementById('address');


(async () => {
  const user = await fetchUserByUserId(readUserId());
  if (user === null) {
    console.error('User is null');
  }

  fullNameEl.textContent = user.fullName();
  emailEl.textContent = user.email;
  phoneNumberEl.textContent = user.phone;
  addressEl.textContent = user.address;


})();