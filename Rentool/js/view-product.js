import { movePageTo, PATHS_PAGES, getUrlParams, GET_PARAMS, getNearestLocation, readUserId } from './util.js';
import { getToolsByReservationToolIndex } from './firebase.js';
import { LocationItem } from './components/LocationItem.js';

let reservationToolIndex = getUrlParams()[GET_PARAMS.RESERVATION_TOOL_INDEX];
/**@type {HTMLButtonElement} */
const requestReservationButtonEl = document.getElementById('view-product-submit-btn');


//@TODO: Delete below, this is only for developmental purpose
reservationToolIndex = reservationToolIndex || '20 LB Demolition Hammer-LB-small';
const signInUserId = readUserId();


document.addEventListener('DOMContentLoaded', async () => {

  const tools = await getToolsByReservationToolIndex(reservationToolIndex);
  const productSelected = tools[0];
  const DESCRIPTION_SEPARATOR = '・';


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


  // ===========availability of product=================

  const productAvailable = document.querySelector('.available-status');

  //  loop for defining status
  const isAvailable = tools.find(tool => tool.isReserved === false);
  console.log('isAvailable: ', isAvailable);
  productAvailable.textContent = isAvailable ? 'Available' : 'Not available';
  if (isAvailable === undefined) {
    requestReservationButtonEl.disabled = 'true';
    requestReservationButtonEl.innerText = 'Not available';
  }


  // ============== description section ===================
  const Description = document.querySelector('.product-description');

  //  print description text
  Description.innerHTML = `
  ${ productSelected.description.split(DESCRIPTION_SEPARATOR).map(
      line =>
        `<p class="product-description__line" >${DESCRIPTION_SEPARATOR}${line}</p>`)
        .slice(1).join('') /// Join all p element
  }`;

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

  // Pass an array of locations from the tool data
  const nearestLocation = await getNearestLocation(tools.map(tool => tool.location));
  // document.getElementById('nearest-location').appendChild(new LocationItem(nearestLocation));

  if (nearestLocation === null) {
    document.getElementsByClassName('change-location')[0].style.display = 'none';
  } else {
    document.getElementById('nearest-location').innerHTML = `${nearestLocation?.address}`;
  }


  requestReservationButtonEl.addEventListener('click', () => {
    if (signInUserId === null) {
      alert('You should Sign In');
      movePageTo(PATHS_PAGES.SIGN_IN);
    } else{
    movePageTo(PATHS_PAGES.RESERVATION_REQUEST, `?reservationToolIndex=${reservationToolIndex}`);
  }
  });
});