import { ItemTarjeta } from './ItemTarjeta.js';

export class FactoryTarjeta {
  static crearTarjeta(options : {fecha: string, titulo: string, descripcion: string} ) {
    return new ItemTarjeta(options);
  }
}
