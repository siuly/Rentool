export class RentoolFooter extends HTMLElement {
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
      rentool-footer {}

			footer{
				background-color: black;
				color:  white;
			}
			footer .social-media ul li{
				list-style: none;
			}
			footer .social-media ul li i{
				color: white;
			}
			.social-media nav ul{
				padding-left: 0;
				margin: 0;
				padding-bottom: 10px;
				display: flex;
				flex-flow: row nowrap;
				gap: 1rem;
				justify-content: center;
			}
			footer p {
				margin: 0;
				text-align: center;
				padding-bottom: 10px;
			}

    `;

    this.innerHTML = `
		<footer>
		<img src="" alt="">

		<div class="social-media">
			<nav>
				<ul>
					<li><a aria-label="Facebook" href="http://www.facebook.com" target="blank"><i class="fab fa-facebook-square"></i></a></li>
					<li><a aria-label="Twitter" href="https://twitter.com/" target="blank"><i class="fab fa-twitter"></a></i></li>
					<li><a aria-label="Linkedin" href="https://linkedin.com"><i class="fab fa-linkedin-in"></i></a></li>
					<li><a aria-label="Instagram" href="https://instagram.com/" target="blank"><i class="fab fa-instagram"></i></a></li>
					<li><a aria-label="Youtube" href="https://youtube.com/" target="blank"><i class="fab fa-youtube"></i></a></li>
				</ul>
			</nav>
		</div>

		<p>© 2022 Rentool All Rights Reserved.</p>
	</footer>

      <style>
        ${styles}
      </style>
      `;
  }
}

window.customElements.define('rentool-footer', RentoolFooter);