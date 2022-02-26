import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES } from './util.js';
import { LocationItem } from './components/LocationItem.js';
import { getAllLocations, getReservationDataByReservationId, returnTool } from './firebase.js';
import { Reservation } from './domain/Reservation.js';




let reservationId = getUrlParams()[GET_PARAMS.RESERVATION_ID];

//@TODO: delete test code
reservationId = reservationId || 'OQqN7llSDJbEjMDX10VZ';

document.addEventListener('DOMContentLoaded', async () => {

  /**@type {Reservation} */
  const reservationData = await getReservationDataByReservationId(reservationId);
  /**@type {Location[]} */
  const locations = await getAllLocations();



  /**@type {Location | null} */
  let returnLocation = null;


  // Write your code below-----------------------------------------
  const locationContainerEl = document.getElementById('locationContainer');

  // Generate locker section
  for (const location of locations) {
    const locationItem = new LocationItem(location);
    locationItem.addEventListener('click', () => {
      returnLocation = location;
      console.log('returnLocation: ', returnLocation);
    });
    locationContainerEl.appendChild(locationItem);
  }

  // Set click event
  const locationItemElementList = document.getElementsByTagName('location-item');
  for (const locationItem of locationItemElementList) {
    locationItem.addEventListener('click', () => {
      for (const locationItemEl of locationItemElementList) {
        locationItemEl.classList.remove('selected-location');
      }
      locationItem.classList.add('selected-location');
    });
  }


  /**@type {HTMLButtonElement} */
  const returnRequestBtnEl = document.getElementById('return-request-btn');
  returnRequestBtnEl.addEventListener('click', async () => {
    if (returnLocation === null) {
      console.log(`ReturnLocation is null`);
      return;
    }
    returnRequestBtnEl.disabled = true;
    const returnResult = await returnTool( /** reservation*/ reservationData, /** locationToReturn */ returnLocation);
    console.log('returnResult: ', returnResult);
    if (returnResult === true) {
      movePageTo(PATHS_PAGES.RETURN_COMPLETE, `?reservationId=${reservationId}`);
    }
  });
});