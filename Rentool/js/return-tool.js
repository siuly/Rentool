import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES } from './util.js';
import { LocationItem } from './components/LocationItem.js';

import { getAllLocations, getReservationDataByReservationId, returnTool } from './firebase.js';
import { Reservation } from './domain/Reservation.js';



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

const locationSelectionDescriptionEl = document.getElementById('location-selection__description');


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

  let returnInstruction = document.getElementById("return-instruction");
  let returnConfirm = document.getElementById("return-confirmation");
  let submitBtn =  document.getElementById("submit");
  
  confirmBtnEl.addEventListener('click', async () => {
    returnRequestBtnEl.disabled = true;
    // const returnResult = await returnTool( /** reservation*/ reservationData, /** locationToReturn */ returnLocation);
    console.log('clicked');
    returnConfirm.classList.add("shown");
    returnInstruction.classList.remove("shown");
    
    // if (returnResult === true) {
    //   movePageTo(PATHS_PAGES.RETURN_COMPLETE, `?reservationId=${reservationId}`);
    // }
  });




  // src: https://github.com/mebjas/html5-qrcode

  //=================QR Code=========================
  let popupbtn = document.getElementById("pop-up");
  let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
  let code =  document.getElementById("user-code");
  var popup = document.getElementById("preview"); 
  
  popupbtn.addEventListener('click', () =>{
      popup.classList.toggle("show");
      Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error('No cameras found.');
    }
    }).catch(function (e) {
    console.error(e);
    });
    });
  
    scanner.addListener('scan', function (content) {
       console.log(content);
      if( content.includes('chinese')){
      scanner.stop();
      popup.classList.add("shown");
      code.innerHTML = `Your code is <span class="code" >8765</span>`;
    }
  });
});
  //==============================================

  // ================Camera Code====================
  const videos = document.getElementById('video');

// Elements for taking the snapshot
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.scale(0.5, 0.5);

document.getElementById("start").addEventListener("click", function () {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then( (stream) => {
      //video.src = window.URL.createObjectURL(stream);
      videos.srcObject = stream;
      // video.play();  // or autplay
    });
  } else {
    console.log("media devices not available in this browser");
  }

});

// Trigger photo take

document.getElementById("snap").addEventListener("click",  () => {
  //canvas.width = video.videoWidth; 
  //canvas.height = video.videoHeight;
  videos.classList.add("shown");
  canvas.classList.remove("shown");
  context.drawImage(video, 0, 0,);
  const imageBlob = canvas.toBlob(handleBlob, 'image/jpeg');
  const tracks = video.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  let videoContainer = document.getElementById("video");
  videoContainer.classList.add("shown");

});

document.getElementById("stop").addEventListener("click",  ()=> {
  const tracks = video.srcObject.getTracks();
  tracks.forEach(track => track.stop());
  let videoContainer = document.getElementById("video");
  videoContainer.classList.add("shown");
  
});

function handleBlob(blob) {
    // we can turn the blob into DOMString
    const objectURL = window.URL.createObjectURL(blob);
    //(objectURL is only contains the address of image object in browser memory)
    //it is vaid for current browser session
    //if we want to store the image into server, one way is to
    //create the base64 rendition of the blob using FileReader
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      console.log(reader.result);
      //also copy to image input
      document.getElementById("image").value = reader.result;
    });
    reader.readAsDataURL(blob); // gives base64 version of the blob
    //reader.readAsArrayBuffer(blob); // gives the ArrayBuffer version of the blob
  
  }


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