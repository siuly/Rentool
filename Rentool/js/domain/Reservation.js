export class Reservation {
  constructor({ reservationId, duration, isReturned, reservationToolIndex, toolId, userId }) {
    this.reservationId = reservationId;
    this.duration = duration;
    this.isReturned = isReturned;
    this.reservationToolIndex = reservationToolIndex;
    this.toolId = toolId;
    this.userId = userId;
  }
}