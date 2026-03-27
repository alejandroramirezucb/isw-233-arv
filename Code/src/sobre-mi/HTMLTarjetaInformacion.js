import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLTarjetaInformacion extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('role', 'article');
  }

}

customElements.define('tarjeta-informacion', HTMLTarjetaInformacion);
