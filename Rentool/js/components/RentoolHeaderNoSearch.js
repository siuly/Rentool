export class RentoolHeaderNoSearch extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
    const sidemenu = document.getElementById('menu');
    toggle.onclick = function() {
      sidemenu.classList.toggle('active');
    };
  }
  render() {
    const styles = `
      header {
        grid-template-rows: 1fr;
        padding: 0.5rem;
      }
      @media screen and (min-width: 500px) {
        header {
          grid-template-rows: 1fr;
          padding: 0.5rem 1rem;
        }
        .logo,
        .header-left {
          grid-row: 1;
        }
      }
    `;

    this.innerHTML = `
    <header>
    <a href="./home.html" class="logo"><img src="../images/logo-full.svg" alt="rentool-logo" class="logo__image"></a>
      <h1><a href="./home.html">Rentool</a></h1>
      <div class="header-left">
        <button id="toggle"><i class="fas fa-bars"></i>
        </button>
        <nav id="menu">
          <ul>
            <li><a href="./active-orders.html">My Active Orders <i class="fa-solid fa-caret-right"></i></a></li>
            <li><a href="./catalogue.html">Tool Catalogue <i class="fa-solid fa-caret-right"></i></a></li>
            <li><a href="./user-profile.html">User Profile <i class="fa-solid fa-caret-right"></i></a></li>
            <li><a href="./services.html">Services <i class="fa-solid fa-caret-right"></i></a></li>
            <li><a href="./reference.html">Reference <i class="fa-solid fa-caret-right"></i></a></li>
            <li id="sign-status"><a href="" id="sign-out">Sign out</a></li>
          </ul>
        </nav>
      </div>
    </header>
      <style>
        ${styles}
      </style>
      `;
  }
}

// window.customElements.define('rentool-header', RentoolHeader);


// WWhen you want to overwrite <rentool-header></rentool-header> element as header
// const header = document.createElement('header');
// this.parentElement.replaceChild(header, this.parentElement.childNodes[1]);