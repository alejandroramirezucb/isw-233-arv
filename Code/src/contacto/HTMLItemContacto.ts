import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemContacto extends HTMLComponenteBase {
  connectedCallback() {
    this.agregarClases('contacto__item');
  }

}

customElements.define('item-contacto', HTMLItemContacto);
