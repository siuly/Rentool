import { Location } from '../domain/Location.js';

export class LocationItem extends HTMLElement {
  /**@param {Location} location*/
  constructor(location) {
    super();
    /**@type {Location} */
    this.location = location;
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const locationItemDiv = document.createElement('div');
    locationItemDiv.className = 'location-item';

    const lockerNameEl = document.createElement('p');
    lockerNameEl.className = 'locker-name';
    lockerNameEl.textContent = this.location.lockerName;

    const addressEl = document.createElement('p');
    addressEl.className = 'address';
    addressEl.textContent = this.location.address;

    locationItemDiv.appendChild(lockerNameEl);
    locationItemDiv.appendChild(addressEl);
    locationItemDiv.innerHTML += `
    <style>
    .location-item {
      padding: 1rem;
      border: 1px solid black;
      width: 80%;
    }
    </style>`;

    this.appendChild(locationItemDiv);
  }
}

window.customElements.define('location-item', LocationItem);