import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES, readUserId } from './util.js';
import { LocationItem } from './components/LocationItem.js';
import { getToolsByReservationToolIndex, reservationRequest } from './firebase.js';
// const sampleToolData = [{
//   toolId: 'R92ruT1ZA0vCV0w9B7aE',
//   toolName: 'driver',
//   description: 'This is a sample data for showing description of the tool users want to reserve',
//   reservationToolIndex: 'driver-brand-small',
//   brand: 'brand',
//   location: {
//     lockerName: 'Locker Name 1',
//     address: '100 W 49th Ave Vancouver, BC V5Y 2Z6',
//     latitude: '49.225518864967654',
//     longitude: '123.10776583584949',
//   },
//   imageUrl: 'https://images.unsplash.com/photo-1566937169390-7be4c63b8a0e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
//   prices: {
//     hourly: 10,
//     daily: 100,
//     weekly: 1000,
//   },
//   size: 'small',
// }, {
//   toolId: '1IDJzk33zxgafzfegU0q',
//   toolName: 'driver',
//   description: 'This is a sample data for showing description of the tool users want to reserve',
//   reservationToolIndex: 'driver-brand-small',
//   brand: 'brand',
//   location: {
//     lockerName: 'Locker Name 2',
//     address: ' 3211 Grant McConachie Way, Richmond, BC V7B 0A4',
//     latitude: '49.1967',
//     longitude: '123.1815',
//   },
//   imageUrl: 'https://firebasestorage.googleapis.com/v0/b/rentool-4a9e6.appspot.com/o/driverjpg.jpg?alt=media&token=8b461f3e-fc70-451f-a13b-1856702ea7cc',
//   prices: {
//     hourly: 10,
//     daily: 100,
//     weekly: 1000,
//   },
//   size: 'small',
// }];

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
let nextbtn = document.getElementById('page1-btn');
let page2 = document.getElementById('page2');
let tname2 = document.getElementById('tool-namepg2');
let totalprice = document.getElementById('pricepg2');
let duration = document.getElementById('durationpg2');
let rentdays = document.getElementById('rental-dates');
let tnameloc = document.getElementById('tool-name-location');
let locationpicked = document.getElementById('location-selected');
let payment = document.getElementById('method');
let reservebtn = document.getElementById('page2-btn');
let page3 = document.getElementById('page3');
let page4 = document.getElementById('page4');
let page5 = document.getElementById('page5');


document.addEventListener('DOMContentLoaded', async () => {
  const toolListForReservationSelection = await getToolsByReservationToolIndex(reservationToolIndex);

  tname.innerHTML = toolListForReservationSelection[0].toolName;
  let dateinput1 = 0;
  let dateinput2 = 0;

  etime.addEventListener('change', (event) => {
    dateinput1 = sdate.value + ' ' + stime.value;
    dateinput2 = edate.value + ' ' + etime.value;
    console.log(dateinput1);
    console.log(dateinput2);
    if (dateinput1 < dateinput2) {
      console.log(get_time_diff(dateinput1, dateinput2));
    } else {
      alert('incorrect date input');
    }

  });


  let diffHoursMilliseconds = 0;
  let days = 0;
  let fprice = 0;
  let fdepo = 0;
  let delta = 0;

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

    let totalHours = 0;
    let fixedhours = 4;
    if (days == 0 && diffHoursMilliseconds < 4) {
      tduration.innerHTML = `Duration: ${days} Days ${diffHoursMilliseconds} Hours`;
      fprice = toolListForReservationSelection[0].prices.hourly * fixedhours;
      tprice.innerHTML = `Price: $ ${fprice}`;
      fdepo = fprice * 0.5;
      tdepo.innerHTML = `Deposit: $ ${fdepo}`;
      console.log('4 hours charged', fprice);
    } else if (days <= 7) {
      tduration.innerHTML = `Duration: ${days} Days ${diffHoursMilliseconds} Hours`;
      totalHours = days * 24 + diffHoursMilliseconds;
      fprice = toolListForReservationSelection[0].prices.hourly * totalHours * .9;
      tprice.innerHTML = `Price: $ ${fprice}`;
      fdepo = fprice * 0.5;
      tdepo.innerHTML = `Deposit: $ ${fdepo}`;
      console.log('day price charged', fprice, 'total hours:', totalHours, 'hours', diffHoursMilliseconds);
    } else if (days >= 7) {
      tduration.innerHTML = `Duration: ${days} Days ${diffHoursMilliseconds} Hours`;
      totalHours = days * 24 + diffHoursMilliseconds;
      fprice = toolListForReservationSelection[0].prices.hourly * totalHours * .8;
      tprice.innerHTML = `Price: $ ${fprice}`;
      fdepo = fprice * 0.5;
      tdepo.innerHTML = `Deposit: $ ${fdepo}`;
      console.log('week price charged', fprice);
    }
  }

  nextbtn.addEventListener('click', () => {
    page1.classList.add('shown');
    page2.classList.remove('shown');
    tname2.innerHTML = toolListForReservationSelection[0].toolName;
    totalprice.innerHTML = `Price: $${fprice}`;
    if (diffHoursMilliseconds != 0) {
      duration.innerHTML = `${days} days and ${diffHoursMilliseconds} hours`;
    } else {
      duration.innerHTML = `${days} days`;
    }
    rentdays.innerHTML = `${dateinput1} to <br> ${dateinput2}`;
    tnameloc.innerHTML = toolListForReservationSelection[0].toolName;
    locationpicked.innerHTML = 'pending'; //pending  to see how to set the location
    payment.innerHTML = 'pending'; //how to show the payment

  });

  reservebtn.addEventListener('click', () => {
    page2.classList.add('shown');
    page3.classList.remove('shown');

  });

  /*
   * ============================================
   * Page Initialization
   * ============================================
   */

  /**@type {Location[]} Location + correspondToolId*/
  const locations = toolListForReservationSelection.map(tool => {
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



  // Add reservation
  document.getElementById('reservation-request-btn').addEventListener('click', async () => {
    const signInUserId = readUserId();
    let reservationRequestData = {
      toolId: selectedToolId,
      toolName: toolListForReservationSelection[0].toolName,
      duration: {
        endDate: '', //@TODO:  Fill from user input
        startDate: '', //@TODO:  Fill from user input
      },
      isReturned: false,
      reservationToolIndex: reservationToolIndex,
      userId: signInUserId,
      createdAt: new Date(),
      imageUrl: toolListForReservationSelection[0].imageUrl,
      location: selectedLocation,

      // @TODO:  Add extra properties from user input
    };


    if (selectedLocation === null) {
      alert('Please select location');
      return;
    }
    if (signInUserId === null) {
      alert('You should Sign In');
      movePageTo(PATHS_PAGES.SIGN_IN);
      return;
    }

    const reservationRequestResult = await reservationRequest(reservationRequestData);

    if (reservationRequestResult === true) {
      console.log('reservationRequestResult === true: ', reservationRequestResult === true);
      alert(`
      The data will be stored:
      ToolId: ${reservationRequestData.toolId}
      Selected Location: ${selectedLocation.lockerName}
      `);

      // TODO: Show: reservation-complete
    }

  });
}); //DOMContentLoaded