import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLListaCategorias extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'list');
    this.agregarClases('categorias__lista');
  }
}

customElements.define('lista-categorias', HTMLListaCategorias);
