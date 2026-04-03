import { FactoryBlogTarjeta } from './FactoryBlogTarjeta.js';
import { ModalBlog } from './ModalBlog.js';
import { Toast } from '../base/Toast.js';
import { ItemBlogTarjeta } from './ItemBlogTarjeta.js';

export class ModalAgregarBlogTarjeta extends ModalBlog {
  private agregarTarjeta;

  constructor(
    categorias: string[],
    agregarTarjeta: (tarjeta: ItemBlogTarjeta) => void,
  ) {
    super({ titulo: 'Agregar Publicación', categorias });
    this.botonTexto = 'Agregar Publicación';
    this.agregarTarjeta = agregarTarjeta;
  }

  crearElemento() {
    super.crearElemento();
    this.vincularEventoAccion();
  }

  vincularEventoAccion() {
    let boton = this.elemento.querySelector('.modal-blog__boton-accion');

    boton.addEventListener('click', (evento) => {
      evento.preventDefault();
      let formulario = this.elemento.querySelector(
        '.modal-blog__formulario',
      ) as HTMLFormElement;
      let formData = new FormData(formulario);
      let fecha = String(formData.get('fecha'));
      let titulo = String(formData.get('titulo'));
      let descripcion = String(formData.get('descripcion'));
      let categoria = String(formData.get('categoria'));

      let tarjeta = FactoryBlogTarjeta.crearTarjeta({
        fecha: fecha,
        titulo: titulo,
        descripcion: descripcion,
        categoria: categoria,
      });

      this.agregarTarjeta(tarjeta);
      formulario.reset();
      this.cerrarModal();
      
      Toast.mostrar({
        mensaje: 'Tarjeta agregada exitosamente.',
        clase: 'toast--agregacion',
      });
    });
  }
}
