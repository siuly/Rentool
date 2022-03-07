import { getReservationDataByReservationId } from './firebase.js';
import { Reservation } from './domain/Reservation.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES } from './util.js';

let reservationId = getUrlParams()[GET_PARAMS.RESERVATION_ID];
reservationId = reservationId || '1cGPIZonW4hXzKLR8GV7';

/**@type {HTMLImageElement} */
const reservationImageEl = document.getElementById('reservation-image');

/**@type {HTMLParagraphElement} */
const reservationInformationEl = document.getElementById('reservation-information');


document.addEventListener('DOMContentLoaded', async () => {
  /**@type {Reservation} */
  const reservation = await getReservationDataByReservationId(reservationId);

  reservationImageEl.src = reservation.imageUrl;

  reservationInformationEl.innerHTML = `
  Kindly remaind you that your rental duration is from <span class="reservation-date">
  ${reservation.duration.startDate}</span>
   to  <span class="reservation-date">${reservation.duration.endDate}</span>.
  `;


});