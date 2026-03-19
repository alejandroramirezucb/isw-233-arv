import { TarjetaFactory } from '../tarjetas/TarjetaFactory.js';
import { ProyectosTarjeta } from './ProyectosTarjeta.js';

export class ProyectosTarjetaFactory extends TarjetaFactory {
  static crearTarjeta(config) {
    return new ProyectosTarjeta(config);
  }
}
