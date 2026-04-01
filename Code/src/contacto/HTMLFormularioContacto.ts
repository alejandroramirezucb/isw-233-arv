import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLFormularioContacto extends HTMLComponenteBase {
  connectedCallback() {
    this.classList.add('contacto__formulario');
    this.setAttribute('role', 'form');
    this.setAttribute('aria-label', 'Formulario de contacto');
  }

}

customElements.define('formulario-contacto', HTMLFormularioContacto);
