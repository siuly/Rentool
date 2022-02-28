import { Reservation } from './domain/Reservation.js';
import { getReservationsByUserId, getToolByToolId } from './firebase.js';


const PATH_RETURN_PAGE = './return-tool.html';
const userId = '9sFhSueVxw3w8fniYAlE';


/** @type {Reservation[]} */
let activeReservations = [new Reservation({
    reservationId: '123456',
    reservationToolIndex: 'driver-brand-small',
    duration: { startDate: '2022-02-12 13:00', endDate: '2022-02-13 13:00' },
    isReturned: false,
    toolId: 'asdfghjkl',
    userId: 'test@mail.com',
    toolName: 'driver'
  }),
  new Reservation({
    reservationId: 'asdfghj',
    reservationToolIndex: 'driver-brand-small',
    duration: { startDate: '2022-03-16 13:00', endDate: '2022-03-23 13:00' },
    isReturned: false,
    toolId: 'asdfghjkl',
    userId: 'test@mail.com',
    toolName: 'driver'
  })
];


document.addEventListener('DOMContentLoaded', async () => {

  activeReservations = await getReservationsByUserId(userId);

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