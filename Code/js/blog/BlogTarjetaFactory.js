import { TarjetaFactory } from '../tarjetas/TarjetaFactory.js';
import { BlogTarjeta } from './BlogTarjeta.js';

export class BlogTarjetaFactory extends TarjetaFactory {
  static crearTarjeta(config) {
    return new BlogTarjeta(config);
  }
}
