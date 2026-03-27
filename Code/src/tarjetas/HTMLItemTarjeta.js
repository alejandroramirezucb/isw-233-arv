import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLItemTarjeta extends HTMLComponenteBase {
    connectedCallback() {
        this.setAttribute('role', 'article');
    }

}

customElements.define('item-tarjeta', HTMLItemTarjeta);