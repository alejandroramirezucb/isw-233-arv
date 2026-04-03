import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLListaNavegacion extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'list');
    this.agregarClases('navegacion__lista');
  }

}

customElements.define('lista-navegacion', HTMLListaNavegacion);
