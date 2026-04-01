import { FactoryTarjeta } from '../tarjetas/FactoryTarjeta.js';
import { ItemBlogTarjeta } from './ItemBlogTarjeta.js';

export class FactoryBlogTarjeta extends FactoryTarjeta {
  static crearTarjeta(options : {fecha: string, titulo: string, descripcion: string, categoria: string}) {
    return new ItemBlogTarjeta(options);
  }
}
