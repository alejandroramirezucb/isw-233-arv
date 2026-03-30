import { ItemTarjeta } from './ItemTarjeta.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaTarjetas extends ComponenteBase {
  tarjetas: ItemTarjeta[] = [];

  crearElemento() {
    let elemento = document.createElement('lista-tarjetas');
    
    for (let tarjeta of this.tarjetas) {
      tarjeta.crearElemento();
      elemento.appendChild(tarjeta.getElemento()!);
    }
    
    this.elemento = elemento;
  }

  agregarTarjeta(config: { tarjeta: ItemTarjeta }) {
    if (!(config.tarjeta instanceof ItemTarjeta)) {
      throw new Error('Debe ser una Tarjeta');
    }

    this.tarjetas.push(config.tarjeta);
  }

  agregarTarjetas(tarjetas: { tarjeta: ItemTarjeta }[]) {
    for (let tarjeta of tarjetas) {
      this.agregarTarjeta(tarjeta);
    }
  }

  eliminarTarjeta(tarjeta: ItemTarjeta) {
    for (let i = 0; i < this.tarjetas.length; i++) {
      if (this.tarjetas[i].esIgualA(tarjeta)) {
        tarjeta.getElemento()!.remove();
        this.tarjetas.splice(i, 1);
        break;
      }
    }
  }

  getTarjetas() {
    return this.tarjetas;
  }
}
