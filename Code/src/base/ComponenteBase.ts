export abstract class ComponenteBase {
  protected elemento: HTMLElement | null = null;

  abstract crearElemento();

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
    }
    return this.elemento;
  }

  get outerHTML() {
    return this.getElemento().outerHTML;
  }
}
