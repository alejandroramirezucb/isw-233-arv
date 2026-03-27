export class ComponenteBase {
  elemento = null;

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
    }
    
    return this.elemento;
  }
}
