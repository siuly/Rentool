export class Location {
  constructor({ locationId, lockerName, address, latitude, longitude, areaLabel }) {
    this.locationId = locationId;
    this.lockerName = lockerName;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.areaLabel = areaLabel;
  }
}