import Handlebars from 'handlebars';
import { ListaBlogTarjetas } from './ListaBlogTarjetas.js';
import { ListaCategorias } from './ListaCategorias.js';
import { ModalAgregarBlogTarjeta } from './ModalAgregarBlogTarjeta.js';
import './HTMLItemCategoria.js';
import './HTMLListaCategorias.js';
import '../tarjetas/HTMLItemTarjeta.js';
import '../tarjetas/HTMLListaTarjetas.js';

export class Blog {
  listaCategorias = new ListaCategorias();
  listaTarjetas = new ListaBlogTarjetas();
  modalAgregarTarjeta = new ModalAgregarBlogTarjeta(
    this.listaCategorias.getCategoriasNombres(),
    this.listaTarjetas.agregarTarjeta.bind(this.listaTarjetas),
  );
  elemento = null;

  static template = Handlebars.compile(`
    <h2 class="blog__titulo-principal">Blog</h2>
    {{> boton tipo = "button" texto="Agregar Publicación" clases="blog__boton-agregar-publicacion"}}
    <div class="blog__contenedor"></div>
  `);

  crearElemento() {
    this.listaCategorias.crearElemento();

    for (let tarjeta of this.listaTarjetas.getTarjetas()) {
      tarjeta.crearElemento();
    }

    const elemento = document.createElement('section');
    elemento.classList.add('blog');
    elemento.innerHTML = this.getTemplate();
    elemento
      .querySelector('.blog__titulo-principal')
      .after(this.listaCategorias.getElemento());

    const contenedor = elemento.querySelector('.blog__contenedor');

    for (let tarjeta of this.listaTarjetas.getTarjetas()) {
      contenedor.appendChild(tarjeta.getElemento());
    }

    this.elemento = elemento;
    this.eventoPorCategoria();
    this.eventoAbrirModalAgregarTarjeta();
  }

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
    }

    return this.elemento;
  }

  getTemplate() {
    return Blog.template({});
  }

  eventoPorCategoria() {
    for (let categoria of this.listaCategorias.getCategorias()) {
      categoria.eventoClick({
        contenedor: this.elemento.querySelector('.blog__contenedor'),
        tarjetas: () =>
          this.listaTarjetas.getTarjetasPorCategoria(categoria.getNombre()),
      });
    }
  }

  eventoAbrirModalAgregarTarjeta() {
    let boton = this.elemento.querySelector('.blog__boton-agregar-publicacion');

    boton.addEventListener('click', (evento) => {
      evento.preventDefault();
      this.modalAgregarTarjeta.crearElemento();
      this.modalAgregarTarjeta.abrirModal();
    });
  }

  renderizar() {
    const contenedor = document.querySelector('.contenido');
    contenedor.innerHTML = '';
    contenedor.appendChild(this.getElemento());
  }
}
