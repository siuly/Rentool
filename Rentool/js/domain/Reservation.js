import { Location } from './Location.js';

export class Reservation {
  constructor({ reservationId = '', duration, isReturned, reservationToolIndex, toolId, userId, toolName, location, imageUrl }) {
    // this.reservationId = reservationId;
    this.duration = duration;
    this.isReturned = isReturned;
    this.reservationToolIndex = reservationToolIndex;
    this.toolId = toolId;
    this.userId = userId;
    this.toolName = toolName;
    /**@type {Location} */
    this.location = location;
    this.imageUrl = imageUrl;
  }
}