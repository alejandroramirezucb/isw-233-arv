import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLListaTarjetas extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'list');
    this.classList.add('tarjetas__lista');
  }

}

customElements.define('lista-tarjetas', HTMLListaTarjetas);
