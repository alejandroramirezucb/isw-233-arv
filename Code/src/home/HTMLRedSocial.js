import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLRedSocial extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'listitem');
    this.setAttribute('class', 'home__red-social');
    this.setAttribute('target', '_blank');
    this.style.cursor = 'pointer';
    this.addEventListener('click', () => {
      window.open(this.getAttribute('href'), '_blank');
    });
  }

}

customElements.define('red-social', HTMLRedSocial);
