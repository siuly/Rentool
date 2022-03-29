export class RentoolFooter extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const styles = `
      /* Element selector  */
      rentool-footer {}
    `;

    this.innerHTML = `
			<footer>
				<img src="../images/logo-footer.svg" alt="footer-logo" class="footer-logo">
				<div class="contact-information">
					<p>Get Help 24/7</p>
					<p class="tell">1-800-657-5861</p>
				</div>
				<div class="social-media">
				<nav>
					<ul>
						<li><a aria-label="Facebook" href="http://www.facebook.com" target="blank"><i class="fab fa-facebook-square"></i></a></li>
						<li><a aria-label="Twitter" href="https://twitter.com/" target="blank"><i class="fab fa-twitter">
						</i> </a></li>
						<li><a aria-label="Linkedin" href="https://linkedin.com"><i class="fab fa-linkedin-in"></i></a></li>
						<li><a aria-label="Instagram" href="https://instagram.com/" target="blank"><i class="fab fa-instagram"></i></a></li>
						<li><a aria-label="Youtube" href="https://youtube.com/" target="blank"><i class="fab fa-youtube"></i></a></li>
					</ul>
				</nav>
				</div>
			<p class="copyright">© 2022 Rentool All Rights Reserved.</p>
			</footer>

      <style>
        ${styles}
      </style>
      `;
  }
}

// window.customElements.define('rentool-footer', RentoolFooter);