import Handlebars from 'handlebars';
import { ItemTarjeta } from '../tarjetas/ItemTarjeta.js';

export class ItemBlogTarjeta extends ItemTarjeta {
  private categoria: string;
  private esFavorito: boolean;

  static template = Handlebars.compile(`
    <div class="blog__cuerpo">
        <div class="blog__header">
            <p class="blog__fecha">{{fecha}}</p>
        <button type="button" class="boton blog__favorito-boton">
          {{> imagen nombre="blog-favorito" imagen="images/star-line.svg" titulo="Marcar como favorito"}}
        </button>
        </div>
        <h3 class="blog__titulo">{{titulo}}</h3>
        <p class="blog__categoria">{{categoria}}</p>
        <p class="blog__descripcion">{{descripcion}}</p>
    </div>
  `);

  constructor(options: {
    fecha: string;
    titulo: string;
    descripcion: string;
    categoria: string;
  }) {
    super(options);
    this.esFavorito = false;
    this.categoria = Object.freeze(options.categoria);
  }

  crearElemento() {
    super.crearElemento();
    this.vincularEventoFavorito();
  }

  marcarFavorito() {
    this.esFavorito = !this.esFavorito;
    const imagen = this.elemento.querySelector(
      '.blog-favorito__imagen',
    ) as HTMLImageElement;
    
    imagen.src = this.esFavorito ? 'images/star.svg' : 'images/star-line.svg';
    
    this.elemento.dispatchEvent(
      new CustomEvent('favorito-cambio', { bubbles: true }),
    );
  }

  getTemplate() {
    return ItemBlogTarjeta.template({
      fecha: this.fecha,
      titulo: this.titulo,
      categoria: this.categoria,
      descripcion: this.descripcion,
    });
  }

  getCategoria() {
    return this.categoria;
  }

  getEsFavorito() {
    return this.esFavorito;
  }

  vincularEventoFavorito() {
    const boton = this.elemento.querySelector('.blog__favorito-boton');

    boton.addEventListener('click', (evento) => {
      evento.preventDefault();
      this.marcarFavorito();
    });
  }
}
