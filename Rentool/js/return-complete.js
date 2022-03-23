import { getReservationDataByReservationId } from './firebase.js';
import { Reservation } from './domain/Reservation.js';
import { getUrlParams, GET_PARAMS, filterNotSignedInUser } from './util.js';

filterNotSignedInUser();

document.addEventListener('DOMContentLoaded', async () => {
  // const reservation = await getReservationDataByReservationId(getUrlParams()[GET_PARAMS.RESERVATION_ID]);
});