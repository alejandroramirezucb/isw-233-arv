import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLListaTarjetas extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'list');
    this.agregarClases('tarjetas__lista');
  }
}

customElements.define('lista-tarjetas', HTMLListaTarjetas);
