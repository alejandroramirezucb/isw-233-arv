export class HTMLComponenteBase extends HTMLElement {
  crearShadow() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
  }
}
