import { fetchUserByUserId } from './firebase.js';
import { filterNotSignedInUser, setOnPageClassToMenuItem, PATHS_PAGES, readUserId, RANDOM_IMAGE_URL } from './util.js';

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
  phoneNumberEl.textContent = user.phone === '' ? '-' : user.phone;
  addressEl.textContent = user.address === '' ? '-' : user.address;

  profileImage.src = user.profileUrl === '' ? RANDOM_IMAGE_URL : user.profileUrl;

  emailEl.textContent = user.email === '' ? firebase.auth().currentUser.email : user.email;
})();