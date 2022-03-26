import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES, DURATION_TOAST_DISPLAY, filterNotSignedInUser } from './util.js';
import { LocationItem } from './components/LocationItem.js';

import { getAllLocations, getReservationDataByReservationId, returnTool } from './firebase.js';
import { Reservation } from './domain/Reservation.js';

Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAwOTQ2MTk5LVRYbFhaV0pRY205cSIsIm9yZ2FuaXphdGlvbklEIjoiMTAwOTQ2MTk5In0=';
      

filterNotSignedInUser(500);

let reservationId = getUrlParams()[GET_PARAMS.RESERVATION_ID];

//@TODO: delete test code
reservationId = reservationId || 'o6KChwOvpJnB7lwwyUww';

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
/**@type {HTMLButtonElement} */
const desktopConfirmBtnEl = document.getElementById('desktop-confirm-btn');

const locationSelectionDescriptionEl = document.getElementById('location-selection__description');


document.addEventListener('DOMContentLoaded', async () => {
  /**@type {Reservation} */
  const reservationData = await getReservationDataByReservationId(reservationId);
  /**@type {Location[]} */
  const locationsMaster = await getAllLocations();
  /**@type {Location | null} */
  const pickedLocation = reservationData.location;


  // Desktop Layout
  if (window.innerWidth > 500) {
    const locationSelectionEl = document.querySelectorAll('.location-selection')[0];
    const returnProgressEl = document.getElementById('return-progress');
    returnProgressEl.appendChild(locationSelectionEl);
  }

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

    renderLocationArea(locationsMaster.filter(location => location.areaLabel === selectedAreaLabel), selectedAreaLabel);
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

  const rentingDays = endDate.diff(startDate, 'days');
  const rentingHours = endDate.diff(startDate, 'hours') - (rentingDays * 24);

  document.getElementById('pick-up-details__duration').innerHTML = `
    <div class="pick-up-details__duration--duration">
      ${rentingDays} Day / ${rentingHours} Hours
    </div>
    <div class="pick-up-details__duration--startDate">
      ${reservationData.duration.startDate} to
    </div>
    <div class="pick-up-details__duration--endDate">
      ${reservationData.duration.endDate}
    </div>`;
  document.getElementById('pick-up-location').appendChild(new LocationItem(pickedLocation));

  returnRequestBtnEl.addEventListener('click', async () => {
    if (returnLocation === null) {
      Toastify({
        text: 'Please select the location to return',
        close: true,
        gravity: 'top',
        position: 'center',
        className: 'error',
        duration: DURATION_TOAST_DISPLAY,
      }).showToast();
      return;
    }

    document.getElementById('return-confirmation__location').appendChild(new LocationItem(returnLocation));
    const endDate = moment(reservationData.duration.endDate).locale('en_CA');
    document.getElementById('return-time__time-container__day').textContent = endDate.format('MMMM DD, YYYY');
    document.getElementById('return-time__time-container__date').textContent = endDate.format('hh:ssA');
    document.getElementById('return-confirmation__location');

    returnProgressEl.classList.toggle('hidden');
    returnConfirmSectionEl.classList.toggle('hidden');
    document.getElementsByClassName('loader-container')[1].style.display = 'none';
  });


  let returnInstruction = document.getElementById('return-instruction');
  let returnConfirm = document.getElementById('return-confirmation');
  let submitBtn = document.getElementById('submit-btn');

  confirmBtnEl.addEventListener('click', async () => {
    returnRequestBtnEl.disabled = true;
    returnConfirm.classList.add('hidden');
    returnInstruction.classList.remove('hidden');
  });

  submitBtn.addEventListener('click', async () => {
    const returnResult = await returnTool( /** reservation*/ reservationData, /** locationToReturn */ returnLocation);
    if (returnResult === true) {
      movePageTo(PATHS_PAGES.RETURN_COMPLETE, `?reservationId=${reservationId}`);
    }
  });


  // @NOTE: Desktop version does not contain QR scan flow
  desktopConfirmBtnEl.addEventListener('click', async () => {
    document.getElementsByClassName('loader-container')[1].style.display = 'block';
    console.log('returnLocation' + returnLocation);
    const returnResult = await returnTool( /** reservation*/ reservationData, /** locationToReturn */ returnLocation);
    if (returnResult === true) {
      movePageTo(PATHS_PAGES.RETURN_COMPLETE, `?reservationId=${reservationId}`);
    }
  });
});


  // src: https://github.com/mebjas/html5-qrcode

  //=================QR Code=========================
// scanner for decoding video
let scanner = null;
let code = document.getElementById('user-code');
let scanbtn = document.getElementById('btn-show-scanner');
// decode video from camera

  
document.getElementById('btn-show-scanner').addEventListener('click', async () => {
  
    try{
        scanner = scanner || await Dynamsoft.DBR.BarcodeScanner.createInstance();
        scanner.onFrameRead = results => {
            if(results.length){
                console.log(results);
            }
        };
        scanner.onUnduplicatedRead = (txt, result) => {
          if(txt.includes('chinese')){
            alert('Your Code is 87412');
            code.innerHTML = 'Your Code is 87412';
            code.classList.remove('hidden');
            scanbtn.classList.add('hidden');
          }
          else{
            alert('Incorrect QR code, please scan the code from the locker.')
          }
        };

        await scanner.show();
    }catch(ex){
        alert(ex.message);
        throw ex;
    }
});
      const fileTypes = [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon"
      ];

      function validFileType(file) {
        return fileTypes.includes(file.type);
      }

      function returnFileSize(number) {
        if(number < 1024) {
          return number + 'bytes';
        } else if(number >= 1024 && number < 1048576) {
          return (number/1024).toFixed(1) + 'KB';
        } else if(number >= 1048576) {
          return (number/1048576).toFixed(1) + 'MB';
        }
      }

      const input = document.getElementById('file-input');
      const preview = document.querySelector('.preview');

      input.style.opacity = 0;

      input.addEventListener('change', updateImageDisplay);

      function updateImageDisplay() {
        while(preview.firstChild) {
          preview.removeChild(preview.firstChild);
        }
      
        const curFiles = input.files;
        if(curFiles.length === 0) {
          const para = document.createElement('p');
          para.textContent = 'No files currently selected for upload';
          preview.appendChild(para);
        } else {
          const list = document.createElement('ol');
          preview.appendChild(list);
          for(const file of curFiles) {
            const listItem = document.createElement('li');
            const para = document.createElement('p');
            if(validFileType(file)) {
              const image = document.createElement('img');
              image.src = URL.createObjectURL(file);
      
              listItem.appendChild(image);
              listItem.appendChild(para);
            } else {
              para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
              listItem.appendChild(para);
            }
      
            list.appendChild(listItem);
          }
        }
      }

//==============================================


/**
 * @description Render location to return
 * @param {Location[]} locations
 * @param {String | null} areaLabel
 * @returns {void};
 */
const renderLocationArea = (locations, areaLabel = null) => {
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
  if (areaLabel !== null) {
    locationSelectionDescriptionEl.textContent = `${locations.length} lockers available in ${areaLabel}`;
    locationSelectionDescriptionEl.style.textAlign = 'left';
  }

};