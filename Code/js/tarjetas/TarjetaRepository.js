import { TarjetaRender } from './TarjetaRender.js';

export class TarjetaRepository {
  tarjetas = [];
  contenedor = undefined;

  agregarTarjeta(tarjeta) {
    if (!(tarjeta instanceof Tarjeta)) {
      throw new Error('Debe ser una Tarjeta');
    }

    this.tarjetas.push(tarjeta);
    TarjetaRender.render(this.contenedor, tarjeta.getElemento());
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

  getContenedor() {
    return this.contenedor;
  }

  limpiarTarjetas() {
    this.tarjetas = [];
    this.contenedor.replaceChildren();
  }
}
