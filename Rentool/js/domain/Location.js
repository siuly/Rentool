export class Reservation {
  constructor({ locationId, lockerName, address, latitude, longitude, containableReservationToolIndex }) {
    this.locationId = locationId;
    this.lockerName = lockerName;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.containableReservationToolIndex = containableReservationToolIndex;
  }
}