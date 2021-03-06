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
      border: 1px solid black;
      border-radius: var(--border-radius-return-tool);
    }
    </style>`;

    this.appendChild(locationItemDiv);
  }
}

window.customElements.define('location-item', LocationItem);