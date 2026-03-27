import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLListaCategorias extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'list');
    this.classList.add('categorias__lista');
  }

}

customElements.define('lista-categorias', HTMLListaCategorias);
