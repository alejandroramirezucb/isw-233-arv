import { ComponenteBase } from './../base/ComponenteBase';
import Handlebars from 'handlebars';
import { ListaBlogTarjetas } from './ListaBlogTarjetas.js';
import { ListaCategorias } from './ListaCategorias.js';
import { ModalAgregarBlogTarjeta } from './ModalAgregarBlogTarjeta.js';
import './HTMLItemCategoria.js';
import './HTMLListaCategorias.js';
import '../tarjetas/HTMLItemTarjeta.js';
import '../tarjetas/HTMLListaTarjetas.js';
import { ItemBlogTarjeta } from './ItemBlogTarjeta';

export class Blog extends ComponenteBase {
  public categoriaActiva: string = 'Todos';
  private listaCategorias: ListaCategorias = new ListaCategorias();
  private listaTarjetas: ListaBlogTarjetas = new ListaBlogTarjetas();

  private modalAgregarTarjeta: ModalAgregarBlogTarjeta =
    new ModalAgregarBlogTarjeta(
      this.listaCategorias.getCategoriasNombres(),
      (tarjeta: ItemBlogTarjeta) => {
        tarjeta.crearElemento();
        let contenedor = this.elemento.querySelector('.blog__contenedor');
        this.listaTarjetas.agregarTarjeta({
          tarjeta: tarjeta,
          contenedor: contenedor,
          categoriaActiva: this.categoriaActiva,
        });
      },
    );

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
    this.eventoTarjetasPorCategoria();
    this.eventoAbrirModalAgregarTarjeta();
    this.eventoSinResultados();
    this.eventoSeleccionarFavorito();
  }

  getTemplate() {
    return Blog.template({});
  }

  eventoTarjetasPorCategoria() {
    for (let categoria of this.listaCategorias.getCategorias()) {
      categoria.eventoClick({
        contenedor: this.elemento.querySelector('.blog__contenedor'),
        tarjetas: () =>
          this.listaTarjetas.getTarjetasPorCategoria(categoria.getNombre()),
        blog: this,
      });
    }
  }

  eventoSinResultados() {
    let contenedor = this.elemento.querySelector('.blog__contenedor');

    let observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        if (
          mutation.type === 'childList' &&
          contenedor.childElementCount === 0
        ) {
          contenedor.innerHTML =
            '<p class="blog__mensaje-sin-resultados">No hay resultados para esta categoría</p>';
        }
      }
    });

    observer.observe(contenedor, {
      childList: true,
    });
  }

  eventoSeleccionarFavorito() {
    this.elemento.addEventListener('favorito-cambio', () => {
      if (this.categoriaActiva !== 'Favoritos') return;

      const contenedor = this.elemento.querySelector('.blog__contenedor');
      contenedor.innerHTML = '';

      for (let tarjeta of this.listaTarjetas.getTarjetasPorCategoria(
        'Favoritos',
      )) {
        contenedor.appendChild(tarjeta.getElemento());
      }
    });
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
