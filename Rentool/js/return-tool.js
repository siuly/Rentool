import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES } from './util.js';
import { LocationItem } from './components/LocationItem.js';

import { getAllLocations, getReservationDataByReservationId, returnTool } from './firebase.js';
import { Reservation } from './domain/Reservation.js';



let reservationId = getUrlParams()[GET_PARAMS.RESERVATION_ID];

//@TODO: delete test code
reservationId = reservationId || 'OQqN7llSDJbEjMDX10VZ';

/**@type {HTMLSelectElement} */
const selectBoxAreaLabelEl = document.getElementById('areaLabel');
/**@type {HTMLButtonElement} */
const returnRequestBtnEl = document.getElementById('return-request-btn');
/**@type {HTMLDivElement} */
const locationContainerEl = document.getElementById('locationContainer');
/**@type {Location | null} */
let returnLocation = null;


/**@type {HTMLDivElement} */
const returnProgressEl = document.getElementById('return-progress');
/**@type {HTMLDivElement} */
const returnConfirmSectionEl = document.getElementById('return-confirmation');
/**@type {HTMLButtonElement} */
const confirmBtnEl = document.getElementById('confirm-btn');


document.addEventListener('DOMContentLoaded', async () => {
  /**@type {Reservation} */
  const reservationData = await getReservationDataByReservationId(reservationId);
  /**@type {Location[]} */
  const locationsMaster = await getAllLocations();
  /**@type {Location | null} */
  const pickedLocation = reservationData.location;

  // Initial Render
  renderLocationArea(locationsMaster);

  // Make areaLabels list without redundant data
  const areaLabels = [...new Set(locationsMaster.map(location => location.areaLabel))];
  for (const areaLabel of areaLabels) {
    const optionEl = document.createElement('option');
    optionEl.value = areaLabel;
    optionEl.textContent = areaLabel;
    selectBoxAreaLabelEl.appendChild(optionEl);
  }

  selectBoxAreaLabelEl.addEventListener('change', (event) => {
    const selectedAreaLabel = event.target.value;
    if (selectedAreaLabel === 'All') {
      console.log(locationsMaster);
      renderLocationArea(locationsMaster);
      return;
    }

    renderLocationArea(locationsMaster.filter(location => location.areaLabel === selectedAreaLabel));
  });

  /** @type {HTMLImageElement} */
  const returnToolImage = document.getElementById('return-tool-image');
  returnToolImage.src = reservationData.imageUrl;
  /** @type {HTMLDivElement} */
  const returnToolName = document.getElementById('return-tool-name');
  returnToolName.textContent = reservationData.toolName;

  /** @type {HTMLSpanElement} */
  const returnTime = document.getElementById('return-time__time');
  returnTime.textContent = reservationData.duration.endDate;

  const startDate = moment(reservationData.duration.startDate).locale('en_CA');
  const endDate = moment(reservationData.duration.endDate).locale('en_CA');

  const rentingDays = startDate.diff(endDate, 'days');
  const rentingHours = startDate.diff(endDate, 'hours') - (rentingDays * 24);

  document.getElementById('pick-up-details__duration').innerHTML = `
    <div class="pick-up-details__duration--duration">
      ${rentingDays} Day / ${rentingHours} Hours
    </div>
    <div class="pick-up-details__duration--startDate">
      ${reservationData.duration.startDate} to
    </div>
    <div class="pick-up-details__duration--startDate">
      ${reservationData.duration.endDate}
    </div>`;
  document.getElementById('pick-up-location').appendChild(new LocationItem(pickedLocation));

  returnRequestBtnEl.addEventListener('click', async () => {
    if (returnLocation === null) {
      alert('Please select the location to return');
      return;
    }
    returnProgressEl.style.display = 'none';
    returnConfirmSectionEl.style.display = 'grid';
    document.getElementById('return-confirmation__location').appendChild(new LocationItem(returnLocation));
    const endDate = moment(reservationData.duration.endDate).locale('en_CA');
    document.getElementById('return-time__time-container__day').textContent = endDate.format('MMMM DD, YYYY');
    document.getElementById('return-time__time-container__date').textContent = endDate.format('hh:ssA');
    document.getElementById('return-confirmation__location');
  });

  confirmBtnEl.addEventListener('click', async () => {
    returnRequestBtnEl.disabled = true;
    const returnResult = await returnTool( /** reservation*/ reservationData, /** locationToReturn */ returnLocation);

    if (returnResult === true) {
      movePageTo(PATHS_PAGES.RETURN_COMPLETE, `?reservationId=${reservationId}`);
    }
  });




  // src: https://github.com/mebjas/html5-qrcode
  // QR scanner ========================================================
  function onScanSuccess(qrCodeMessage) {
    // document.getElementById('result').innerHTML = '<span class="result">' + qrCodeMessage + '</span>';
    alert('The locker will open');
    console.log('qrCodeMessage: ', qrCodeMessage);


    // Enable the return-submit button
  }

  function onScanError(errorMessage) {
    console.log('errorMessage: ', errorMessage);
  }

  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250 });
  html5QrcodeScanner.render(onScanSuccess, onScanError);
  // QR scanner ========================================================
});



/**
 * @description Render location to return
 * @param {Location} locations
 * @returns {void};
 */
const renderLocationArea = (locations) => {
  locationContainerEl.innerHTML = '';

  // Generate locker section
  for (const location of locations) {
    const locationItem = new LocationItem(location);
    locationItem.addEventListener('click', () => {
      returnLocation = location;
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

  document.getElementsByClassName('loader-container')[0].style.display = 'none';
};