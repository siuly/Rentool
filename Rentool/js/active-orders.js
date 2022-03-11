import { Reservation } from './domain/Reservation.js';
import { getReservationsByUserId, getToolByToolId } from './firebase.js';
import { readUserId } from './util.js';

const PATH_RETURN_PAGE = './return-tool.html';



document.addEventListener('DOMContentLoaded', async () => {
  const userId = readUserId();

  /**@type {Reservation[]} */
  const activeReservations = await getReservationsByUserId(userId);


  const reservationContainerEl = document.getElementById('reservation-container');
  // HTML Generate iteration START================================
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
          <p class="active-order__text--returnDate">Return Due: ${endDate}</p>
          <p class="active-order__text--pickDate">Pick date:${startDate}</p>
        </div>
        <a href="${`${PATH_RETURN_PAGE}?reservationId=${reservationId}`}" class="active-order__return-link">
          <div class="active-order__return-link--text">Return</div>
        </a>
    `;
    reservationContainerEl.appendChild(returnItemEl);
  }
  //HTML Generate iteration  END================================

});