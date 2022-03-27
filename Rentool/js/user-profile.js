import { fetchUserByUserId } from './firebase.js';
import { filterNotSignedInUser, setOnPageClassToMenuItem, PATHS_PAGES, readUserId } from './util.js';

filterNotSignedInUser();
setOnPageClassToMenuItem(PATHS_PAGES.USER_PROFILE);


const fullNameEl = document.getElementById('full-name');
const emailEl = document.getElementById('email');
const phoneNumberEl = document.getElementById('phone-number');
const addressEl = document.getElementById('address');
/**@type {HTMLImageElement} */
const profileImage = document.getElementById('profile-image');


(async () => {
  const user = await fetchUserByUserId(readUserId());
  if (user === null) {
    console.error('User is null');
  }

  fullNameEl.textContent = user.fullName();
  emailEl.textContent = user.email === '' ? '-' : user.email;
  phoneNumberEl.textContent = user.phone === '' ? '-' : user.phone;
  addressEl.textContent = user.address === '' ? '-' : user.address;
  if (user.profileUrl !== '') {
    profileImage.src = user.profileUrl;
  }

})();