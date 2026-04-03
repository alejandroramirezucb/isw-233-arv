import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemCategoria extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'listitem');
    this.agregarClases('categoria-item');
  }
}

customElements.define('item-categoria', HTMLItemCategoria);
