import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemCategoria extends ComponenteBase {
  static template = Handlebars.compile(`
    {{> boton tipo='button' texto=nombre clases='blog__categoria-boton'}}
  `);

  constructor(nombre) {
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

  esIgual(categoria) {
    return this.nombre === categoria;
  }

  getNombre() {
    return this.nombre;
  }

  eventoClick(config) {
    const boton = this.elemento.querySelector(
      '.blog__categoria-boton',
    );

    boton.addEventListener('click', (_) => {
      let contenedor = config.contenedor;
      contenedor.innerHTML = '';

      for (let tarjeta of config.tarjetas()) {
        contenedor.appendChild(tarjeta.getElemento());
      }

      config.blog.categoriaActiva = this.nombre;
    });
  }
}
