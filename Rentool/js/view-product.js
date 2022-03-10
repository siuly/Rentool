import { movePageTo, PATHS_PAGES, getUrlParams, GET_PARAMS, getNearestLocation } from './util.js';
import { getToolsByReservationToolIndex } from './firebase.js';
import { LocationItem } from './components/LocationItem.js';

let reservationToolIndex = getUrlParams()[GET_PARAMS.RESERVATION_TOOL_INDEX];
//@TODO: Delete below, this is only for developmental purpose
reservationToolIndex = reservationToolIndex || '20 LB Demolition Hammer-LB-small';


document.addEventListener('DOMContentLoaded', async () => {

  const tools = await getToolsByReservationToolIndex(reservationToolIndex);
  const productSelected = tools[0];


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

  //  loop for defining status
  const isAvailable = tools.find(tool => tool.isReserved === false);
  productAvailable.textContent = isAvailable ? 'Available' : 'Not available';


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

  // Pass an array of locations from the tool data
  const nearestLocation = await getNearestLocation(tools.map(tool => tool.location));
  // document.getElementById('nearest-location').appendChild(new LocationItem(nearestLocation));
  document.getElementById('nearest-location').innerHTML = `
    ${nearestLocation.address}
  `;





  document.getElementById('view-product-submit-btn').addEventListener('click', () => {
    movePageTo(PATHS_PAGES.RESERVATION_REQUEST, `?reservationToolIndex=${reservationToolIndex}`);
    // movePageTo('reservation-request.html', `?reservationToolIndex=${reservationToolIndex}`);
  });
});