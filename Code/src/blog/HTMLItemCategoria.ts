import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemCategoria extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'listitem');
    this.classList.add('categoria-item');
  }

}

customElements.define('item-categoria', HTMLItemCategoria);
