import { FactoryTarjeta } from '../tarjetas/FactoryTarjeta.js';
import { ItemProyectosTarjeta } from './ItemProyectosTarjeta.js';

export class FactoryProyectosTarjeta extends FactoryTarjeta {
  static crearTarjeta(config) {
    return new ItemProyectosTarjeta(config);
  }
}
