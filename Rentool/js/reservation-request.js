import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES, readUserId } from './util.js';
import { LocationItem } from './components/LocationItem.js';
import { getToolsByReservationToolIndex, reservationRequest } from './firebase.js';

let reservationToolIndex = getUrlParams()[GET_PARAMS.RESERVATION_TOOL_INDEX];
//@TODO: delete
reservationToolIndex = reservationToolIndex || '20 LB Demolition Hammer-LB-small';


let startDate = document.getElementById('start-date');
let startTime = document.getElementById('start-time');
let endDate = document.getElementById('end-date');
let endTime = document.getElementById('end-time');
let toolName = document.getElementById('tool-name');

if (startDate.value && endDate.value == null) {
  rent = etime.value - stime.value;
  console.log(rent);
}

let reservationRequestData = {
  toolId: '',
  duration: {
    endDate: '',
    startDate: '',
  },
  isReturned: false,
  reservationToolIndex: reservationToolIndex,
  userId: readUserId() || '',
  createdAt: new Date()

  //You can add additional property
};
let selectedLocation = null;

document.addEventListener('DOMContentLoaded', async () => {































  /*
   * ============================================
   * Page Initialization
   * ============================================
   */

  //@TODO: change variable name, this data is no longer sample
  const sampleToolData = await getToolsByReservationToolIndex(reservationToolIndex);

  /**@type {Location[]} Location + correspondToolId*/
  const locations = sampleToolData.map(tool => {
    return { ...tool.location, correspondToolId: tool.toolId };
  });



  const locationContainerEl = document.getElementById('locationContainer');

  for (const location of locations) {
    const locationItem = new LocationItem(location);
    locationItem.addEventListener('click', () => {
      reservationRequestData.toolId = location.correspondToolId;
      selectedLocation = location;
    });
    locationContainerEl.appendChild(locationItem);
  }

  // Set click event
  const locationItemElementList = document.getElementsByTagName('location-item');
  for (const locationItem of locationItemElementList) {
    locationItem.addEventListener('click', () => {
      // Clear selected class up
      for (const locationItemEl of locationItemElementList) {
        locationItemEl.classList.remove('selected-location');
      }
      locationItem.classList.add('selected-location');
    });
  }

  const pageSectionElementList = [...document.getElementsByClassName('page')];
  const nextPageButtonList = [...document.getElementsByClassName('page-btn')];
  // Page shift event
  for (const nextPageButton of nextPageButtonList) {
    /**@param {MouseEvent} e */
    nextPageButton.addEventListener('click', (e) => {
      const nextPageId = e.target.dataset.next;
      // Remove shown class from all page
      for (const page of pageSectionElementList) {
        page.classList.remove('shown');
      }

      if (nextPageId === '') { /**@TODO: show the last page */ }

      document.getElementById(nextPageId).classList.add('shown');
    });
  }

  // Location select event
  document.getElementById('page1').addEventListener('click', () => {
    if (selectedLocation === null) {
      alert('Please select the location');
      return;
    }


  });


  //@TODO: Delete
  // TEST: for reservation submit
  reservationRequestData = {
    toolId: sampleToolData[0].toolId,
    duration: {
      endDate: '2023-03-01 13:00',
      startDate: '2023-04-01 13:00',
    },
    isReturned: false,
    reservationToolIndex: reservationToolIndex,
    userId: readUserId() || '',
    imageUrl: sampleToolData[0].imageUrl,
    createdAt: new Date()
  };


  document.getElementById('reservation-request-btn').addEventListener('click', async () => {
    console.log(`START`);
    if (selectedLocation === null) {
      return;
    }
    console.log(`MIDDLE`);
    const reservationRequestResult = await reservationRequest(reservationRequestData);
    console.log('reservationRequestResult: ', reservationRequestResult);
    if (reservationRequestResult === true) {
      console.log('reservationRequestResult === true: ', reservationRequestResult === true);
      alert(`
      The data will be stored:
      ToolId: ${reservationRequestData.toolId}
      Selected Location: ${selectedLocation.lockerName}
      `);
    }
    console.log(`END`);
  });


}); //DOMContentLoaded