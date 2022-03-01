import { Location } from './domain/Location.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES, readUserId } from './util.js';
import { LocationItem } from './components/LocationItem.js';
import { getToolsByReservationToolIndex, reservationRequest } from './firebase.js';

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




let reservationToolIndex = getUrlParams()[GET_PARAMS.RESERVATION_TOOL_INDEX];
//@TODO: delete
reservationToolIndex = reservationToolIndex || '20 LB Demolition Hammer-LB-small';



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
  let sdate = document.getElementById('start-date');
  let stime = document.getElementById('start-time');
  let edate = document.getElementById('end-date');
  let etime = document.getElementById('end-time');
  let tname = document.getElementById('tool-namepg1');
  let tduration = document.getElementById('durationpg1');
  let tprice = document.getElementById('price');
  let tdepo = document.getElementById('deposit');

tname.innerHTML = sampleToolData[0].toolName;
document.addEventListener('DOMContentLoaded', async () => {

  
  // console.log(sampleToolData[0].toolName);

  etime.addEventListener('change', (event) =>{
    let dateinput1 = sdate.value + ' ' + stime.value;
    let dateinput2 = edate.value + ' ' + etime.value;
    console.log(dateinput1);
    console.log(dateinput2);
    
    if (dateinput1 < dateinput2) {
    
    console.log(get_time_diff(dateinput1, dateinput2));
    }else{
      alert('incorrect date input');
    }
    
  })

  // with delta declare outside the function  I'll be able to use it for  other  sections
  let delta = 0;

  function get_time_diff( d1 , d2 )
  {  
      let datetime3 = new Date( d1 );
      let datetime4 = new Date( d2 );
      delta = datetime4 - datetime3;
      console.log(delta);
      let days = Math.floor(delta / 1000 / 60 / (60 * 24));
      let date_diff = new Date(delta);

      console.log(date_diff);
      console.log(days.getHours());
      tduration.innerHTML = `Duration: ${days} Days ${date_diff.getHours()} Hours`;
      console.log(sampleToolData[0].prices.daily);
      
      let fprice = sampleToolData[0].prices.daily * days;

      tprice.innerHTML = `Price: $ ${fprice}`;

      let fdepo = fprice * 0.5;

      tdepo.innerHTML = `Deposit: $ ${fdepo}`;


      // console.log("-------------");
      // console.log(date_diff.getHours());
  

      return days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds";
  
      // return delta;
  
    }

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