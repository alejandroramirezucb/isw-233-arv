import Handlebars from 'handlebars';
import { Tarjeta } from '../tarjetas/Tarjeta.js';

export class BlogTarjeta extends Tarjeta {
  static template = Handlebars.compile(`<div class="blog__cuerpo">
    <div class="blog__header">
      <p class="blog__fecha">
        <time datetime="{{fecha}}">{{fecha}}</time>
      </p>
      <button type="button" class="boton favorito__boton">
        <figure class="favorito__figura">
          <img src="images/star-line.svg" alt="Marcar como favorito" 
               title="Marcar como favorito" class="favorito__imagen" />
        </figure>
      </button>
    </div>
    <h3 class="blog__titulo">{{titulo}}</h3>
    <p class="blog__categoria">{{categoria}}</p>
    <p class="blog__descripcion">{{descripcion}}</p>
  </div>`);

  constructor(config) {
    super(config);
    this.esFavorito = false;
    this.nombre = 'blog';
    this.categoria = config.categoria;
  }

  getEsFavorito() {
    return this.esFavorito;
  }

  getElemento() {
    let elemento = super.getElemento();
    this.clickFavorito(elemento);
    return elemento;
  }

  getCategoria() {
    return this.categoria;
  }

  setCategoria(categoria) {
    this.categoria = categoria;
  }

  marcarComoFavorito() {
    this.esFavorito = !this.esFavorito;
  }

  clickFavorito(elemento) {
    const boton = elemento.querySelector('.favorito__boton');
    const imagen = elemento.querySelector('.favorito__imagen');

    boton.addEventListener(
      'click',
      (evento) => {
        evento.preventDefault();
        evento.stopPropagation();
        evento.stopImmediatePropagation();

        this.marcarComoFavorito();
        imagen.src = this.esFavorito
          ? 'images/star.svg'
          : 'images/star-line.svg';
      },
      true,
    );
  }

  getContenido() {
    return BlogTarjeta.template({
      fecha: this.fecha,
      titulo: this.titulo,
      categoria: this.categoria,
      descripcion: this.descripcion,
    });
  }
}
