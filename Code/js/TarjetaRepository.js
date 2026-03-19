export class TarjetaRepository {
  tarjetas = [];
  contenedor = undefined;

  agregarTarjeta(tarjeta) {
    if (!(tarjeta instanceof Tarjeta)) {
      throw new Error('Debe ser una Tarjeta');
    }

    this.tarjetas.push(tarjeta);
    this.renderTarjeta(tarjeta);
  }

  eliminarTarjeta(tarjeta) {
    for (let i = 0; i < this.tarjetas.length; i++) {
      if (this.tarjetas[i] === tarjeta) {
        tarjeta.getElemento().remove();
        this.tarjetas.splice(i, 1);
        break;
      }
    }
  }

  getTarjetas() {
    return this.tarjetas;
  }

  getTarjeta(index) {
    return this.tarjetas[index];
  }

  setTarjeta(index, tarjeta) {
    this.tarjetas[index] = tarjeta;
  }

  limpiarTarjetas() {
    this.tarjetas = [];
    this.contenedor.replaceChildren();
  }

  renderTarjetas() {
    this.contenedor.replaceChildren();

    for (let tarjeta of this.tarjetas) {
      this.renderTarjeta(tarjeta);
    }
  }

  renderTarjeta(tarjeta) {
    let elemento = tarjeta.getElemento();
    this.contenedor.append(elemento);
  }
}
