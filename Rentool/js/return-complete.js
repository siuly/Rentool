import { getReservationDataByReservationId } from './firebase.js';
import { Reservation } from './domain/Reservation.js';
import { getUrlParams, GET_PARAMS, movePageTo, PATHS_PAGES } from './util.js';

document.addEventListener('DOMContentLoaded', async () => {
  const reservation = await getReservationDataByReservationId(getUrlParams()[GET_PARAMS.RESERVATION_ID]);
	console.log('reservation: ', reservation);
});