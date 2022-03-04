export class Reservation {
  constructor({ reservationId = '', duration, isReturned, reservationToolIndex, toolId, userId, toolName }) {
    // this.reservationId = reservationId;
    this.duration = duration;
    this.isReturned = isReturned;
    this.reservationToolIndex = reservationToolIndex;
    this.toolId = toolId;
    this.userId = userId;
    this.toolName = toolName;
  }
}