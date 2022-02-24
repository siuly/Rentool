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


header{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  background-color: #FAB328;
  height: auto;  
}

header h1{
  grid-column: 2;
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  line-height: 20px;
  font-size: 36px;
}

.header-left {
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  margin-left: 10px;
}


button{
  border: none;
  background-color: unset;
}

button div{
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  line-height: 20px;
}

#menu{
  position: absolute;
  top: 70px;
  height: 60%;
  padding-top: 20px;
  width: 50%;
  left: -51%;
  background-color: white;
  transition: 0.5s;
}

#menu.active{
  left: 0;
 }

#menu li{
  list-style: none;
  color: black;
  line-height: 2;
  padding-left: 30px;
  margin-right: 10px;
  margin-top: 10px;
  box-shadow: 0 7px 8px -7px #222;
}
#menu li:nth-of-type(6){
  list-style: none;
  color: black;
  line-height: 2;
  margin-right: 0;
  margin-top: 15px;
  box-shadow: none;
  text-align: right;
}
#menu a{
  text-decoration: none;
  color: black;
}
#menu ul{
  padding: 0;
}





    `;

    this.innerHTML = `
        <header>
          <h1>Rentool</h1>
          <div class="header-left">
            <button id="toggle"><i class="fas fa-bars"></i><div>MENU</div></button>
            <nav  id="menu">
              <ul>
                <li><a href="">My Account</a></li>
                <li><a href="">Tool Catalogue</a></li>
                <li><a href="">Locations</a></li>
                <li><a href="">About Rentool</a></li>
                <li><a href="">Contact Us</a></li>
                <li id="sign-status"><a href="">Sign out</a></li>
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

window.customElements.define('rentool-header', RentoolHeader);


// WWhen you want to overwrite <rentool-header></rentool-header> element as header
// const header = document.createElement('header');
// this.parentElement.replaceChild(header, this.parentElement.childNodes[1]);