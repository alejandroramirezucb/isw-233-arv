import { Toast } from '../base/Toast.js';
import { FactoryTarjeta } from '../tarjetas/FactoryTarjeta.js';
import { ItemProyectosTarjeta } from './ItemProyectosTarjeta.js';

export class FactoryProyectosTarjeta extends FactoryTarjeta {
  static crearTarjeta(options: {
    fecha: string;
    titulo: string;
    descripcion: string;
    imagenUrl: string;
  }) {
    if (!options.imagenUrl) {
      let toast = new Toast({
        mensaje: 'Campo requerido: URL de la imagen',
        clase: 'toast--error',
      });

      toast.abrirToast();
    }

    return new ItemProyectosTarjeta(options);
  }
}
