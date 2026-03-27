import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemHobbie extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'listitem');
    this.classList.add('hobbies__item');
  }

}

customElements.define('item-hobbie', HTMLItemHobbie);
