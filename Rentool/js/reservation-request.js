import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES, readUserId, filterNotSignedInUser } from './util.js';
import { LocationItem } from './components/LocationItem.js';
import { getToolsByReservationToolIndex, reservationRequest } from './firebase.js';


filterNotSignedInUser();


let reservationToolIndex = getUrlParams()[GET_PARAMS.RESERVATION_TOOL_INDEX];
//@TODO: delete
reservationToolIndex = reservationToolIndex || '20 LB Demolition Hammer-LB-small';


let selectedLocation = null;
let selectedToolId = null;
let page1 = document.getElementById('page1');
let sdate = document.getElementById('start-date');
let stime = document.getElementById('start-time');
let edate = document.getElementById('end-date');
let etime = document.getElementById('end-time');
let tname = document.getElementById('tool-namepg1');
let tduration = document.getElementById('durationpg1');
let tprice = document.getElementById('price');
let tdepo = document.getElementById('deposit');
let terms = document.getElementById('agree-terms');
let termTxt = document.getElementById('terms-text');
let nextbtn = document.getElementById('page1-btn');
let page2 = document.getElementById('page2');
let tname2 = document.getElementById('tool-namepg2');
let totalprice = document.getElementById('pricepg2');
let duration = document.getElementById('durationpg2');
let rentdays = document.getElementById('rental-dates');
let tnameloc = document.getElementById('tool-name-location');
let locationpicked = document.getElementById('location-selected');
let reservebtn = document.getElementById('page2-btn');
let allFields = document.querySelector('input');
let submitreservation = document.getElementById('reservation-request-btn');


const signInUserId = readUserId();



document.addEventListener('DOMContentLoaded', async () => {



  const toolListForReservationSelection = await getToolsByReservationToolIndex(reservationToolIndex);

  tname.innerHTML = toolListForReservationSelection[0].toolName;
  let dateinput1 = '';
  let dateinput2 = 0;



  etime.addEventListener('change', (event) => {
    sdate.style.border = 'solid 1px black';
    dateinput1 = sdate.value + ' ' + stime.value;
    dateinput2 = edate.value + ' ' + etime.value;
    console.log(dateinput1);
    console.log(dateinput2);
    if (dateinput1 < dateinput2) {
      console.log(get_time_diff(dateinput1, dateinput2));
    } else if (edate.value < sdate.value) {
      alert('Return date should happened after pick-up date');
      edate.style.border = 'solid 1px red';
    } else if (sdate.value === edate.value) {
      if (etime.value < stime.value) {
        alert('Return time should happened after pick-up time');
      }
    }
  });
  sdate.addEventListener('change', () => {
    sdate.style.border = 'solid 1px black';
  });
  edate.addEventListener('change', () => {
    edate.style.border = 'solid 1px black';
  });
  stime.addEventListener('change', () => {
    stime.style.border = 'solid 1px black';
  });
  etime.addEventListener('change', () => {
    etime.style.border = 'solid 1px black';
  });
  terms.addEventListener('change', () => {
    termTxt.style.color = 'black';
  });

  let diffHoursMilliseconds = 0;
  let days = 0;
  let fprice = 0;
  let fdepo = 0;
  let delta = 0;
  let totalHours = 0;

  function get_time_diff(d1, d2) {
    let datetime3 = new Date(d1);
    let datetime4 = new Date(d2);
    delta = datetime4 - datetime3;
    console.log(delta);
    days = Math.floor(delta / 1000 / 60 / (60 * 24));
    console.log('days: ', days);
    let date_diff = new Date(delta);
    const diffMilliseconds = date_diff;
    diffHoursMilliseconds = Math.floor((diffMilliseconds - (days * 86400000)) / 3600000);


    let fixedhours = 4;
    if (days == 0 && diffHoursMilliseconds < 4) {
      tduration.innerHTML = `Duration: ${days} Days ${diffHoursMilliseconds} Hours`;
      fprice = toolListForReservationSelection[0].prices.hourly * fixedhours;
      tprice.innerHTML = `Price: $ ${Number.parseFloat(fprice).toFixed(2)}`;
      fdepo = fprice * 0.5;
      tdepo.innerHTML = `Deposit: $ ${Number.parseFloat(fdepo).toFixed(2)}`;
      console.log('4 hours charged', fprice);
    } else if (days <= 7) {
      tduration.innerHTML = `Duration: ${days} Days ${diffHoursMilliseconds} Hours`;
      totalHours = days * 24 + diffHoursMilliseconds;
      fprice = toolListForReservationSelection[0].prices.hourly * totalHours * .9;
      tprice.innerHTML = `Price: $ ${Number.parseFloat(fprice).toFixed(2)}`;
      fdepo = fprice * 0.5;
      tdepo.innerHTML = `Deposit: $ ${Number.parseFloat(fdepo).toFixed(2)}`;
      console.log('day price charged', fprice, 'total hours:', totalHours, 'hours', diffHoursMilliseconds);
    } else if (days >= 7) {
      tduration.innerHTML = `Duration: ${days} Days ${diffHoursMilliseconds} Hours`;
      totalHours = days * 24 + diffHoursMilliseconds;
      fprice = toolListForReservationSelection[0].prices.hourly * totalHours * .8;
      tprice.innerHTML = `Price: $ ${Number.parseFloat(fprice).toFixed(2)}`;
      fdepo = fprice * 0.5;
      tdepo.innerHTML = `Deposit: $ ${Number.parseFloat(fdepo).toFixed(2)}`;
      console.log('week price charged', fprice);
    }
  }

  nextbtn.addEventListener('click', () => {
    console.log(dateinput1);
    if (sdate.value <= 0) {
      sdate.style.border = 'solid 1px red';
      alert('Please select a pick-up date');
    } else if (stime.value <= 0) {
      stime.style.border = 'solid 1px red';
      alert('Please select pick-up time');
    } else if (edate.value <= 0) {
      edate.style.border = 'solid 1px red';
      alert('Please select a return date');
    } else if (etime.value <= 0) {
      etime.style.border = 'solid 1px red';
      alert('Please select a return time');
    } else if (selectedLocation === null) {
      alert('Please select the location');
    }
    // else if(sdate.value > edate.value){
    //   alert('Please choose a valid date');

    // }
    else if (!terms.checked) {
      termTxt.style.color = 'red';
      alert('please check the terms');
    } else {
      page1.classList.add('shown');
      page2.classList.remove('shown');
      tname2.innerHTML = toolListForReservationSelection[0].toolName;
      totalprice.innerHTML = `Price: $${Number.parseFloat(fprice).toFixed(2)}`;
      if (diffHoursMilliseconds != 0) {
        duration.innerHTML = `${days} days and ${diffHoursMilliseconds} hours`;
      } else {
        duration.innerHTML = `${days} days`;
      }

      rentdays.innerHTML = `${dateinput1} to <br> ${dateinput2}`;
      tnameloc.innerHTML = toolListForReservationSelection[0].toolName;
      locationpicked.innerHTML = `${selectedLocation.lockerName} <br> ${selectedLocation.address} `;
    }
  });

  /*
   * ============================================
   * Page Initialization
   * ============================================
   */

  /**@type {Location[]} Location + correspondToolId*/
  const locations = toolListForReservationSelection.filter(tool => tool.isReserved === false).map(tool => {
    return { ...tool.location, correspondToolId: tool.toolId };
  });
  const locationContainerEl = document.getElementById('locationContainer');
  for (const location of locations) {
    const locationItem = new LocationItem(location);
    locationItem.addEventListener('click', () => {
      selectedToolId = location.correspondToolId;
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
    try {
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
    } catch (error) {
      console.log('error: ', error);
    }
  }
  // Location select event
  // document.getElementById('page1').addEventListener('click', () => {
  //   if (selectedLocation === null) {
  //     alert('Please select the location');
  //     return;
  //   }
  // });



  // Add reservation
  reservebtn.addEventListener('click', async () => {
    page1.style.display = 'none';
    page2.classList.add('shown');

    let reservationRequestData = {

      toolId: selectedToolId,
      toolName: toolListForReservationSelection[0].toolName,
      duration: {
        endDate: dateinput2,
        startDate: dateinput1,
      },
      isReturned: false,
      reservationToolIndex: reservationToolIndex,
      userId: signInUserId,
      createdAt: new Date(),
      imageUrl: toolListForReservationSelection[0].imageUrl,
      location: selectedLocation,

      // @TODO:  Add extra properties from user input
    };

    const reservationId = await reservationRequest(reservationRequestData);

    if (reservationId !== null) {
      movePageTo(PATHS_PAGES.RESERVATION_COMPLETE, `?reservationId=${reservationId}`);
    }

  });
}); //DOMContentLoaded