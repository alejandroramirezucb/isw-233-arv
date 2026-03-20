export class TarjetaElement extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', 'article');
  }
}

customElements.define('tarjeta-element', TarjetaElement);
