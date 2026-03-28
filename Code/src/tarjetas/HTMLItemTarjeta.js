import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemTarjeta extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'article');
    this.setAttribute('data-escala', '1.03');
  }
}

customElements.define('item-tarjeta', HTMLItemTarjeta);
