export abstract class ComponenteBase {
  protected elemento: HTMLElement | null = null;
  outerHTML: string | null = null;

  abstract crearElemento();

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
      this.outerHTML = this.elemento.outerHTML;
    }
    return this.elemento;
  }
}
