export class HTMLComponenteBase extends HTMLElement {
  crearShadow() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
  }

  protected agregarClases(...clases: string[]) {
    clases.forEach((clase) => this.classList.add(clase));
  }
}
