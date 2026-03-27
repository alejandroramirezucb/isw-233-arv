import { FactoryBlogTarjeta } from './FactoryBlogTarjeta.js';
import { ModalBlog } from './ModalBlog.js';

export class ModalAgregarBlogTarjeta extends ModalBlog {
  botonTexto = 'Agregar Publicación';

  constructor(categorias, agregarTarjeta) {
    super('Agregar Publicación', categorias);
    this.agregarTarjeta = agregarTarjeta;
  }

  crearElemento() {
    super.crearElemento();
    this.eventoAccion();
  }

  eventoAccion() {
    let boton = this.elemento.querySelector('.modal-blog__boton-accion');

    boton.addEventListener('click', (evento) => {
      evento.preventDefault();
      let formulario = this.elemento.querySelector('.modal-blog__formulario');
      let formData = new FormData(formulario);
      let fecha = formData.get('fecha');
      let titulo = formData.get('titulo');
      let descripcion = formData.get('descripcion');
      let categoria = formData.get('categoria');

      let tarjeta = FactoryBlogTarjeta.crearTarjeta({
        fecha: fecha,
        titulo: titulo,
        descripcion: descripcion,
        categoria: categoria,
      });

      this.agregarTarjeta(tarjeta);
      formulario.reset();
      this.cerrarModal();
    });
  }
}
