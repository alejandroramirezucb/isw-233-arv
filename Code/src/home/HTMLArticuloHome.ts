import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLArticuloHome extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'article');
    this.classList.add('home__articulo');
  }

}

customElements.define('articulo-home', HTMLArticuloHome);
