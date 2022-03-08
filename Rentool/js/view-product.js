import { movePageTo, PATHS_PAGES, getUrlParams, GET_PARAMS, getNearestLocation } from './util.js';
import { getToolsByReservationToolIndex } from './firebase.js';
import { LocationItem } from './components/LocationItem.js';

let reservationToolIndex = getUrlParams()[GET_PARAMS.RESERVATION_TOOL_INDEX];


// The differences of the two data are 'toolId' and 'location'
const sampleToolData = [{
  toolId: '12345678',
  toolName: 'driver',
  description: 'This is a sample data for showing description of the tool users want to reserve',
  reservationToolIndex: 'driver-brand-small',
  brand: 'brand',
  location: {
    lockerName: 'Locker Name',
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
  category: 'category1',
  size: 'small',
  isReserved: true,
}, {
  toolId: 'asdfghjkl',
  toolName: 'driver',
  description: 'This is a sample data for showing description of the tool users want to reserve@@@@@@@@@',
  reservationToolIndex: 'driver-brand-small',
  brand: 'brand',
  location: {
    lockerName: 'Locker Name',
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
  category: 'category2',
  size: 'small',
  isReserved: false,
}];
const sampleNearestLocation = sampleToolData[0].location;



document.addEventListener('DOMContentLoaded', async () => {

  reservationToolIndex = reservationToolIndex || '20 LB Demolition Hammer-LB-small';

  const tools = await getToolsByReservationToolIndex(reservationToolIndex);
  const tool = tools[0];
  const nearestLocation = await getNearestLocation(tools.map(tool => tool.location));
  const productSelected = tool;


  // ==============category section =============

  const categoryTitle = document.querySelector('.product-category');
  const categoryTitleH2 = document.createElement('h2');
  // print it
  categoryTitle.appendChild(categoryTitleH2).innerHTML = productSelected.category;

  // ==============picture section =============
  const productImage = document.querySelector('.product-image img');
  productImage.setAttribute('src', `${productSelected.imageUrl}`);
  // load alt atribute
  productImage.setAttribute('alt', `${productSelected.toolName}`);

  // ===========title of product=================

  const productTitle = document.querySelector('.product-title');
  const productTitleP = document.createElement('h3');
  //  print description text
  productTitle.appendChild(productTitleP).innerHTML = productSelected.toolName;


  // ===========avaliability of product=================

  const productAvailable = document.querySelector('.available-status');
  const productAvailableP = document.createElement('p');
  //  loop for defining status
  let AvailableStatus = '';
  status();

  function status() {
    if (productSelected.isReserved == true) {
      AvailableStatus = 'Available';
    } else {
      AvailableStatus = 'Not available';
    }
  }
  //  print description text
  productAvailable.appendChild(productAvailableP).innerHTML = AvailableStatus;







  // ============== description section ===================
  const Description = document.querySelector('.product-description');
  const ProductDescription = document.createElement('p');
  //  print description text
  Description.appendChild(ProductDescription).innerHTML = productSelected.description;

  // ============ table section ====================

  // ==hourly==
  const price4Hours = document.querySelector('.price-table-four-hours');
  const price4HoursNewColumn = document.createElement('td');
  // result hourly
  price4Hours.appendChild(price4HoursNewColumn).innerHTML = `$ ${Number.parseFloat((productSelected.prices.hourly)).toFixed(2)}`;


  // ==per day==
  const priceDay = document.querySelector('.price-table-per-day');
  const priceDayColumn = document.createElement('td');
  // result per day
  priceDay.appendChild(priceDayColumn).innerHTML = `$ ${Number.parseFloat(productSelected.prices.daily).toFixed(2)}`;


  // ==per week==
  const priceWeek = document.querySelector('.price-table-per-week');
  const priceWeekColumn = document.createElement('td');
  // result week
  priceWeek.appendChild(priceWeekColumn).innerHTML = `$ ${Number.parseFloat(productSelected.prices.weekly).toFixed(2)}`;

  // ============== location ================

  document.getElementById('nearest-location').appendChild(new LocationItem(nearestLocation));




  // ===========================================


  document.getElementById('view-product-submit-btn').addEventListener('click', () => {
    // movePageTo(PATHS_PAGES.RESERVATION_REQUEST, `?reservationToolIndex=${reservationToolIndex}`);
    movePageTo('reservation-request-test.html', `?reservationToolIndex=${reservationToolIndex}`);
  });
});