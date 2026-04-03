import { ItemCategoria } from './ItemCategoria.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaCategorias extends ComponenteBase {
  private categorias = [
    new ItemCategoria('Todos'),
    new ItemCategoria('Tecnología'),
    new ItemCategoria('Inteligencia Artificial'),
    new ItemCategoria('Favoritos'),
  ];

  crearElemento() {
    const elemento = document.createElement('lista-categorias');

    for (let categoria of this.categorias) {
      elemento.appendChild(categoria.getElemento());
    }

    this.elemento = elemento;
  }

  getCategorias() {
    return this.categorias;
  }

  getCategoriasNombres() {
    let categoriasNombres = [];

    for (let categoria of this.categorias) {
      if (
        categoria.getNombre() !== 'Todos' &&
        categoria.getNombre() !== 'Favoritos'
      ) {
        categoriasNombres.push(categoria.getNombre());
      }
    }

    return categoriasNombres;
  }
}
