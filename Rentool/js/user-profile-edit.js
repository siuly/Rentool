import { User } from './domain/User.js';
import { fetchUserByUserId, updateUserByUserId, updateUserEmail, uploadFileToCloudStorage } from './firebase.js';
import { filterNotSignedInUser, setOnPageClassToMenuItem, PATHS_PAGES, readUserId, movePageTo } from './util.js';

filterNotSignedInUser();
setOnPageClassToMenuItem(PATHS_PAGES.USER_PROFILE);

/**@type {HTMLImageElement} */
const profileImageEl = document.getElementById('profile-image');
/**@type {HTMLInputElement} */
const imageInputEl = document.getElementById('img-file');

/**@type {HTMLInputElement} */
const firstNameInputEl = document.getElementById('fname');
/**@type {HTMLInputElement} */
const lastNameInputEl = document.getElementById('lname');
/**@type {HTMLInputElement} */
const emailInputEl = document.getElementById('email');
/**@type {HTMLInputElement} */
const phoneInputEl = document.getElementById('phone-number');
/**@type {HTMLInputElement} */
const addressInputEl = document.getElementById('address');
/**@type {HTMLInputElement} */
const submitButtonEl = document.getElementById('submit-button');

/**@type {File | null} */
let updatedImage = null;

/**@type {User} */
let oldUser = null;

(async () => {
  const user = await fetchUserByUserId(readUserId());
  if (user === null) {
    console.error('User is null');
  }
  firstNameInputEl.value = user.firstName;
  lastNameInputEl.value = user.lastName;
  emailInputEl.value = user.email;
  phoneInputEl.value = user.phone;
  addressInputEl.value = user.address;

  if (user.profileUrl !== '') {
    profileImageEl.src = user.profileUrl;
  }

  oldUser = user;
})();

imageInputEl.addEventListener('change', (event) => {
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImageEl.src = e.target.result;
      updatedImage = input.files[0];
    };
    reader.readAsDataURL(input.files[0]);
  }
});

submitButtonEl.addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    const user = new User({
      FirstName: firstNameInputEl.value,
      LastName: lastNameInputEl.value,
      email: emailInputEl.value,
      phone: phoneInputEl.value,
      address: addressInputEl.value,
      profileUrl: '',
    });

    if (user.email !== oldUser.email) {
      await updateUserEmail(user.email);
    }

    if (updatedImage !== null) {
      user.profileUrl = await uploadFileToCloudStorage(updatedImage, `${new Date()}${updatedImage.name}`, 'users');
    }
    await updateUserByUserId(readUserId(), user);
    movePageTo(PATHS_PAGES.USER_PROFILE);

  } catch (error) {
    Toastify({
      text: `${error}`,
      close: true,
      gravity: 'top',
      position: 'center',
      className: 'error',
      duration: DURATION_TOAST_DISPLAY,
    }).showToast();
    console.log('error: ', error);
  }
});