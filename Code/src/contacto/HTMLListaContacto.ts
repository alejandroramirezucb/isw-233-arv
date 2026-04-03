import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLListaContacto extends HTMLComponenteBase {
  connectedCallback() {
    this.agregarClases('contacto__lista');
    this.setAttribute('aria-label', 'Información de contacto');
  }

}

customElements.define('lista-contacto', HTMLListaContacto);
