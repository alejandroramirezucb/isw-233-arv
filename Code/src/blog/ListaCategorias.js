import { ItemCategoria } from './ItemCategoria.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaCategorias extends ComponenteBase {
  categorias = [
    new ItemCategoria('Todos'),
    new ItemCategoria('Tecnología'),
    new ItemCategoria('Inteligencia Artificial'),
    new ItemCategoria('Favoritos'),
  ];

  crearElemento() {
    const elemento = document.createElement('lista-categorias');
    for (let categoria of this.categorias) {
      categoria.crearElemento();
      elemento.appendChild(categoria.getElemento());
    }
    this.elemento = elemento;
  }

  getCategorias() {
    return this.categorias;
  }
}
