import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemHobbie extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'listitem');
    this.agregarClases('hobbies__item');
    this.setAttribute('data-escala', '1.15');
  }

}

customElements.define('item-hobbie', HTMLItemHobbie);
