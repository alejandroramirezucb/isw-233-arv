import { ItemTarjeta } from './ItemTarjeta.js';

export class FactoryTarjeta {
  static crearTarjeta(config : {fecha: string, titulo: string, descripcion: string} ) {
    return new ItemTarjeta(config);
  }
}
