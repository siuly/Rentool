import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS, readUserId } from './util.js';
import { LocationItem } from './components/LocationItem.js';

const reservationToolIndex = getUrlParams()[GET_PARAMS.RESERVATION_TOOL_INDEX];

const sampleToolData = [{
  toolId: 'R92ruT1ZA0vCV0w9B7aE',
  toolName: 'driver',
  description: 'This is a sample data for showing description of the tool users want to reserve',
  reservationToolIndex: 'driver-brand-small',
  brand: 'brand',
  location: {
    lockerName: 'Locker Name 1',
    address: '100 W 49th Ave Vancouver, BC V5Y 2Z6',
    latitude: '49.225518864967654',
    longitude: '123.10776583584949',
  },
  imageUrl: 'https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
  prices: {
    hourly: 10,
    daily: 100,
    weekly: 1000,
  },
  size: 'small',
}, {
  toolId: '1IDJzk33zxgafzfegU0q',
  toolName: 'driver',
  description: 'This is a sample data for showing description of the tool users want to reserve',
  reservationToolIndex: 'driver-brand-small',
  brand: 'brand',
  location: {
    lockerName: 'Locker Name 2',
    address: ' 3211 Grant McConachie Way, Richmond, BC V7B 0A4',
    latitude: '49.1967',
    longitude: '123.1815',
  },
  imageUrl: 'https://firebasestorage.googleapis.com/v0/b/rentool-4a9e6.appspot.com/o/driverjpg.jpg?alt=media&token=8b461f3e-fc70-451f-a13b-1856702ea7cc',
  prices: {
    hourly: 10,
    daily: 100,
    weekly: 1000,
  },
  size: 'small',
}];


let reservationRequestData = {
  toolId: '',
  duration: {
    endDate: '',
    startDate: '',
  },
  isReturned: false,
  reservationToolIndex: reservationToolIndex,
  userId: readUserId() || '',

  //You can add additional property
};

/**@type {Location[]} Location + correspondToolId*/
const locations = sampleToolData.map(tool => {
  return { ...tool.location, correspondToolId: tool.toolId };
});

let selectedLocation = null;

document.addEventListener('DOMContentLoaded', async () => {

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
      for (const locationItemEl of locationItemElementList) {
        locationItemEl.classList.remove('selected-location');
      }
      locationItem.classList.add('selected-location');
    });
  }


});


document.getElementById('page1-btn').addEventListener('click', () => {
  console.log('Click');
  document.getElementById('page1').classList.remove('shown');
  document.getElementById('page2').classList.add('shown');

  // Shown class will be set {display: block}, while others set {display: none}

});


document.getElementById('reservation-request-btn').addEventListener('click', () => {


  alert(`
  The data will be stored:
  ToolId: ${reservationRequestData.toolId}
  Selected Location: ${selectedLocation.lockerName}
  `);
});




// IDEA to set toolId to Locker name

// const page3El = document.getElementById('page3');
// for (const tool of sampleToolData) {
//   const cardEl = document.createElement('div');
//   cardEl.textContent = tool.toolName;
//   cardEl.addEventListener('click', () => {
//     console.log(tool.toolId); // You can set toolId to each Element
//   });
//   page3El.appendChild(cardEl);
// }