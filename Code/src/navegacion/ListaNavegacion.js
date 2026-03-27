import { ItemNavegacion } from './ItemNavegacion.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaNavegacion extends ComponenteBase {
  items = [
    new ItemNavegacion('/', 'Home'),
    new ItemNavegacion('/sobre-mi', 'Sobre mi'),
    new ItemNavegacion('/proyectos', 'Proyectos'),
    new ItemNavegacion('/blog', 'Blog'),
    new ItemNavegacion('/contacto', 'Contacto'),
  ];

  crearElemento() {
    let elemento = document.createElement('lista-navegacion');
    for (let item of this.items) {
      item.crearElemento();
      elemento.appendChild(item.getElemento());
    }
    this.elemento = elemento;
  }

  getItems() {
    return this.items;
  }
}
