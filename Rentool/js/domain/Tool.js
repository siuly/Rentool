export class Tool {
  constructor({ toolId, toolName, location, prices, category, imageUrl, reservationToolIndex, size, isReserved, brand }) {
    this.toolId = toolId;
    this.toolName = toolName;
    this.location = location;
    this.prices = prices;
    this.category = category;
    this.imageUrl = imageUrl;
    this.reservationToolIndex = reservationToolIndex;
    this.size = size;
    this.isReserved = isReserved;
    this.brand = brand;
  }
}