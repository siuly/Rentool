import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS } from './util.js';
import { LocationItem } from './components/LocationItem.js';
import { returnTool } from './firebase.js';


const sampleReservationData = {
  reservationId: '1234556',
  userId: '9sFhSueVxw3w8fniYAlE',
  toolId: 'WEwfy9lVcUk6lXlJtYHj',
  duration: {
    startDate: '2022-02-20 13:30:00',
    endDate: '2022-02-28 13:30:00'
  },
  isReturned: false,
  reservationToolIndex: 'driver-brand-small',
};

const sampleLocationData = [{
  locationId: '123456',
  lockerName: 'Locker Name 1 ',
  address: '100 W 49th Ave Vancouver, BC V5Y 2Z6',
  latitude: '49.225518864967654',
  longitude: '123.10776583584949',
}, {
  locationId: 'asdfgh',
  lockerName: 'Locker Name 2',
  address: ' 3211 Grant McConachie Way, Richmond, BC V7B 0A4',
  latitude: '49.1967',
  longitude: '123.1815',
}];




document.addEventListener('DOMContentLoaded', async () => {

  /**@type {Location | null} */
  let returnLocation = null;

  const reservationData = sampleReservationData;

  /**@type {Location[]} */
  const locations = sampleLocationData;

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
    returnTool( /** reservation*/ reservationData, /** locationToReturn */ returnLocation);
  });
});




console.log(getUrlParams()[GET_PARAMS.RESERVATION_ID]);