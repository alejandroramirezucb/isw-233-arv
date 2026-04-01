import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';
import { ItemTarjeta } from '../tarjetas/ItemTarjeta.js';
import { Blog } from './Blog.js';

export class ItemCategoria extends ComponenteBase {
  private nombre : string;
  static template = Handlebars.compile(`
    {{> boton tipo='button' texto=nombre clases='blog__categoria-boton'}}
  `);

  constructor(nombre : string) {
    super();
    this.nombre = nombre;
  }

  crearElemento() {
    let elemento = document.createElement('item-categoria');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return ItemCategoria.template({
      nombre: this.nombre,
    });
  }

  esIgual(categoria : string) {
    return this.nombre === categoria;
  }

  getNombre() {
    return this.nombre;
  }

  eventoClick(options : {contenedor : HTMLElement, tarjetas : () => ItemTarjeta[], blog : Blog}) {
    const boton = this.elemento.querySelector(
      '.blog__categoria-boton',
    );

    boton.addEventListener('click', (_) => {
      let contenedor = options.contenedor;
      contenedor.innerHTML = '';

      for (let tarjeta of options.tarjetas()) {
        contenedor.appendChild(tarjeta.getElemento());
      }

      options.blog.categoriaActiva = this.nombre;
    });
  }
}
