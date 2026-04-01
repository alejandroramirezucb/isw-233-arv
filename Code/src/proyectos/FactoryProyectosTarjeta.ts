import { FactoryTarjeta } from '../tarjetas/FactoryTarjeta.js';
import { ItemProyectosTarjeta } from './ItemProyectosTarjeta.js';

export class FactoryProyectosTarjeta extends FactoryTarjeta {
  static crearTarjeta(options: {fecha: string; titulo: string; descripcion: string; imagenUrl: string }) {
    return new ItemProyectosTarjeta(options);
  }
}
