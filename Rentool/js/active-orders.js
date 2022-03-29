import { Reservation } from './domain/Reservation.js';
import { getReservationsByUserId, getToolByToolId } from './firebase.js';
import { readUserId, filterNotSignedInUser, setOnPageClassToMenuItem, PATHS_PAGES } from './util.js';

filterNotSignedInUser();

const PATH_RETURN_PAGE = './return-tool.html';

document.addEventListener('DOMContentLoaded', async () => {
  setOnPageClassToMenuItem(PATHS_PAGES.ACTIVE_ORDERS);

  const userId = readUserId();

  /**@type {Reservation[]} */
  const activeReservations = await getReservationsByUserId(userId);


  const reservationContainerEl = document.getElementById('reservation-container');
  // HTML Generate iteration START================================
  try {
    for (const reservation of activeReservations) {
      /** */
      const tool = await getToolByToolId(reservation.toolId);
      if (tool === null) { continue; }

      // Variables for HTML content
      const { imageUrl, toolName } = tool;
      const { reservationId } = reservation;
      const { startDate, endDate } = reservation.duration;

      /**@type {HTMLDivElement} */
      const returnItemEl = document.createElement('div');
      returnItemEl.className = 'order';
      returnItemEl.innerHTML = `
          <img src="${imageUrl}" alt="${toolName}" class="active-order__image">
          <div class="active-order__text">
            <p class="active-order__text--toolName">${toolName}</p>
            <p class="active-order__text--returnDate">Expires:  ${endDate}</p>
          </div>
          <a href="${`${PATH_RETURN_PAGE}?reservationId=${reservationId}`}" class="active-order__return-link">
            <div class="active-order__return-link--text">Return</div>
          </a>
      `;
      reservationContainerEl.appendChild(returnItemEl);
    }
    //HTML Generate iteration  END================================
  } catch (error) {
    console.error(error);
  }


});