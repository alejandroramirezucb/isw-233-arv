import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLListaHobbies extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'list');
    this.classList.add('hobbies__lista');
  }

}

customElements.define('lista-hobbies', HTMLListaHobbies);
