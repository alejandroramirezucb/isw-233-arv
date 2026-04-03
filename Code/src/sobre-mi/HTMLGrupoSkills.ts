import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLGrupoSkills extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'listitem');
    this.agregarClases('skills__grupo');
  }

}

customElements.define('grupo-skills', HTMLGrupoSkills);
