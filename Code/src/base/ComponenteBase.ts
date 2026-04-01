export class ComponenteBase {
  protected elemento: HTMLElement | null = null;

  crearElemento() {}

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
    }

    return this.elemento;
  }
}
