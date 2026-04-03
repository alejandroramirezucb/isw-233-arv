import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemSkill extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'listitem');
    this.agregarClases('skills__item');
    this.setAttribute('data-escala', '1.1');
  }

}

customElements.define('item-skill', HTMLItemSkill);
