import { Tarjeta } from '../tarjetas/Tarjeta.js';

export class BlogTarjeta extends Tarjeta {
  constructor(config) {
    super(config);
    this.esFavorito = false;
    this.name = 'blog';
  }

  getEsFavorito() {
    return this.esFavorito;
  }

  getElemento() {
    let elemento = super.getElemento();
    this.clickFavorito(elemento);
    return elemento;
  }

  marcarComoFavorito() {
    this.esFavorito = !this.esFavorito;
  }

  clickFavorito(elemento) {
    const boton = elemento.querySelector('.favorito__boton');
    const imagen = elemento.querySelector('.favorito__imagen');

    boton.addEventListener('click', (evento) => {
      evento.preventDefault();
      this.esFavorito = !this.esFavorito;

      imagen.src = this.esFavorito ? 'images/star.svg' : 'images/star-line.svg';
    });
  }

  getContenido() {
    return `<button type="submit" class="boton favorito__boton">
    <figure class="favorito__figura">
      <img
        src="images/star-line.svg"
        alt="Marcar como favorito"
        title="Marcar como favorito"
        class="favorito__imagen" />
    </figure>
    </button>
    ${super.getContenido()}`;
  }
}
