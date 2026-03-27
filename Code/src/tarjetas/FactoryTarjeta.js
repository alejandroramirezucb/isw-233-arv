import { ItemTarjeta } from './ItemTarjeta.js';

export class FactoryTarjeta {
  static crearTarjeta(config) {
    return new ItemTarjeta(config);
  }
}
