export class ComponenteBase {
  /** @type {HTMLElement | null} */
  elemento = null;

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
    }
    
    return this.elemento;
  }
}
