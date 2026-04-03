import { Toast } from '../base/Toast.js';
import { FactoryTarjeta } from '../tarjetas/FactoryTarjeta.js';
import { ItemBlogTarjeta } from './ItemBlogTarjeta.js';

export class FactoryBlogTarjeta extends FactoryTarjeta {
  static crearTarjeta(options : {fecha: string, titulo: string, descripcion: string, categoria: string}) {
    if (!options.categoria) {
      let toast = new Toast({
        mensaje: 'Campo requerido: categoria',
        clase: 'error',
      });
      
      toast.abrirToast();
    }
    return new ItemBlogTarjeta(options);
  }
}
