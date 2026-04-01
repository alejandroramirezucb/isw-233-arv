import { HTMLComponenteBase } from './HTMLComponenteBase.js';

export class HTMLToast extends HTMLComponenteBase {
  connectedCallback() {
    this.setAttribute('open', '');
    this.setAttribute('role', 'status');
    this.addEventListener('animationend', (evento) => {
      if (evento.animationName === 'toast-salir') {
        this.remove();
      }
    });
  }
}

customElements.define('toast-elemento', HTMLToast);
