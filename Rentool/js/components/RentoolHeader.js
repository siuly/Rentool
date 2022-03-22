export class RentoolHeader extends HTMLElement {
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
      /* Element selector  */
      rentool-header {}
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
      <div class="input-row">
        <form action="./product-result.html" method="get" class="input-container">
          <button class="icon"><i class="fa fa-search"></i></button>
          <input type="text" placeholder="Search" name="keyword">
        </form>
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