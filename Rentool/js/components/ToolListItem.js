export class ToolListItem extends HTMLElement {
  constructor(tool) {
    super();
    this.tool = tool;
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const { toolName, description, imageUrl, reservationToolIndex } = this.tool;

    this.classList.add('tool-list__item');
    this.innerHTML = `
      <div class="tool-item__image-container">
        <img src="${imageUrl}" alt="${toolName}" class="tool-item__image">
      </div>
      <div class="tool-item__tool-name">${toolName}</div>
      <div class="tool-item__description">${description}</div>
      <div class="tool-item__availability">
        <span class="circle">
        <i class="fa-solid fa-circle"></i></span><span class="tool-item__availability--text">Available at your location</span>
      </div>
      <form action="view-product.html" method="get">
        <input type="hidden" name="reservationToolIndex" value="${reservationToolIndex}">
        <input type="submit" value="Button" class="tool-item__submit">
      </form>
    `;
  }
}

window.customElements.define('tool-list__item', ToolListItem);