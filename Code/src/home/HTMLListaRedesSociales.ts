import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLListaRedesSociales extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'list');
    this.agregarClases('home__redes-sociales');
  }

}

customElements.define('lista-redes-sociales', HTMLListaRedesSociales);
