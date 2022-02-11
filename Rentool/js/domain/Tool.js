export class Tool {
  constructor({ toolName, bland = '' }) {
    this.toolName = toolName;
    this.bland = bland;
  }
  generateHtml = () => {
    const p = document.createElement('p');
    p.textContent = this.toolName;
    return p;
  };
}