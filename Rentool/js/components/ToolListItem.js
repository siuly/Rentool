export class ToolListItem extends HTMLElement {
  constructor(tool) {
    super();
    this.tool = tool;
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const { toolName, imageUrl, reservationToolIndex, isReserved } = this.tool;

    this.classList.add('tool-list__item');
    this.innerHTML = `
    <a href="./view-product.html?reservationToolIndex=${reservationToolIndex}" class="link-view-product">
      <div class="tool-item__image-container">
        <img src="${imageUrl}" alt="${toolName}" class="tool-item__image">
      </div>
      <div class="tool-item__tool-name">${toolName}</div>

      <div class="tool-item__availability">
        <span class="circle${isReserved ? ' reserved' : ''}">
        <i class="fa-solid fa-circle"></i></span><span class="tool-item__availability--text">${
          isReserved ? 'Unavailable at your location' : 'Available at your location'
        }</span>
      </div>
      </a>
    `;
  }
}

window.customElements.define('tool-list__item', ToolListItem);