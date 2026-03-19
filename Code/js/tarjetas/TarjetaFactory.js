import { Tarjeta } from './Tarjeta.js';

export class TarjetaFactory {
  static crearTarjeta(config) {
    return new Tarjeta(config);
  }
}
