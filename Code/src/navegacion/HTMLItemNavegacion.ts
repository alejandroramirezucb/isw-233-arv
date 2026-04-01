import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemNavegacion extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'listitem');
    this.classList.add('navegacion__item');
  }

}

customElements.define('item-navegacion', HTMLItemNavegacion);
