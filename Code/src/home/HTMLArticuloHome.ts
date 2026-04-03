import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLArticuloHome extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'article');
    this.agregarClases('home__articulo');
  }

}

customElements.define('articulo-home', HTMLArticuloHome);
