import { FactoryTarjeta } from '../tarjetas/FactoryTarjeta.js';
import { ItemBlogTarjeta } from './ItemBlogTarjeta.js';

export class FactoryBlogTarjeta extends FactoryTarjeta {
  static crearTarjeta(config) {
    return new ItemBlogTarjeta(config);
  }
}
