import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemSkill extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'listitem');
    this.classList.add('skills__item');
  }

}

customElements.define('item-skill', HTMLItemSkill);
