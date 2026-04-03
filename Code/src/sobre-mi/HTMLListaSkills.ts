import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLListaSkills extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'list');
    this.agregarClases('skills__lista');
  }

}

customElements.define('lista-skills', HTMLListaSkills);
