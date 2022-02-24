export class RentoolHeader extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const styles = `
      :root {
        --color-primary: #fab328;
        --color-primary-variant: #ffc400;
        --color-secondary: #70d0db;
        --color-secondary-variant: #3ea8dd;
        --color-error: #ff5757;
        --color-typography-primary-light: #222222;
        --color-typography-primary-light: #222222;
        --color-typography-secondary-light: #d6d1d1;
        --color-typography-primary-dark: #000000;
        --color-typography-secondary-dark: #d6d1d1;
        --color-background: #ffff;
        --font-size-tagline-bold: 60px;
        --font-size-heading-bold: 44px;
        --font-size-headings-bold: 24px;
        --font-size-body-text: 16px;
        --font-size-secondary-text: 14px;
      }

      /* Element selector  */
      rentool-header {}

      header {
        display: grid;
        grid-template-areas:
          "arrow heading heading menu"
          "input input input input";

        padding: 1rem;
        background-color: var(--color-primary);
      }

      .return-icon {
        grid-area: arrow;
        display: grid;
        align-items: center;
      }

      h2 {
        grid-area: heading;
        text-align: center;
        font-size: 2rem;
      }

      .return-icon {
        grid-area: arrow;
        display: grid;
        align-items: center;
      }

      header h2 {
        grid-area: heading;
        text-align: center;
        font-size: 2rem;
      }

      .header-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1rem;
      }

      .input-row {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 1rem;

        grid-area: input;
        padding-top: 0.3rem;
      }

      .input-container {
        flex: 1 0 30%;
        background-color: var(--color-background);
        border-radius: 10px;
        padding: 0.3rem;
        display: flex;
        flex-flow: row nowrap;
      }

      .input-container input {
        flex: 1 0 40%;
      }

      .input-container input:focus {
        outline: none;
      }

      .input-row .icon {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        outline: none;
        color: grey;
      }

      .input-container .fa-microphone {
        text-align: end;
        padding-right: 1rem;
        color: grey;
      }

      .input-row input {
        border: none;
        background-color: unset;
      }

      .fa-circle {
        color: grey;
      }
    `;

    this.innerHTML = `
      <header>
        <span class="return-icon">
          <i class="fa-solid fa-less-than"></i>
        </span>
        <h2>Products</h2>
        <div class="header-right">
          <i class="fa-solid fa-circle"></i>
          <i class="fas fa-bars"></i>
        </div>
        <div class="input-row">
          <form action="./product-result.html" method="get" class="input-container">
            <button class="icon"><i class="fa fa-search"></i></button>
            <input type="text" placeholder="Search" name="keyword">
            <i class="fa-solid fa-microphone"></i>
          </form>
          <i class="fa-solid fa-align-right"></i>
        </div>
      </header>

      <style>
        ${styles}
      </style>
      `;
  }
}

window.customElements.define('rentool-header', RentoolHeader);


// WWhen you want to overwrite <rentool-header></rentool-header> element as header
// const header = document.createElement('header');
// this.parentElement.replaceChild(header, this.parentElement.childNodes[1]);