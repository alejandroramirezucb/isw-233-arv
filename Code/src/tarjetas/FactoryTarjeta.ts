import { Toast } from '../base/Toast.js';
import { ItemTarjeta } from './ItemTarjeta.js';

export class FactoryTarjeta {
  static crearTarjeta(options: {
    fecha: string;
    titulo: string;
    descripcion: string;
  }) {
    if (!options.fecha || !options.titulo || !options.descripcion) {
      let toast = new Toast({
        mensaje: 'Campos requeridos: fecha, titulo, descripcion',
        clase: 'toast--error',
      });

      toast.abrirToast();
    }

    return new ItemTarjeta(options);
  }
}
