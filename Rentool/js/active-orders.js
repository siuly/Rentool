import { Reservation } from './domain/Reservation.js';


const PATH_RETURN_PAGE = './return-tool.html';
const userId = 'test@mail.com';


/** @type {Reservation[]} */
const activeReservations = [new Reservation({
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
  console.log(activeReservations);

  for (const reservation of activeReservations) {
    console.log(reservation);
    /**@type {HTMLAnchorElement} */
    const returnLinkEl = document.getElementsByClassName('return-link')[0];
    returnLinkEl.href = `${PATH_RETURN_PAGE}?reservationId=${reservation.reservationId}`;

    document.getElementsByClassName('reservation__text')[0].textContent = reservation.toolName;
  };
});