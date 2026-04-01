import { ItemNavegacion } from './ItemNavegacion.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaNavegacion extends ComponenteBase {
  private items = [
    new ItemNavegacion({ url: '/', nombre: 'Home' }),
    new ItemNavegacion({ url: '/sobre-mi', nombre: 'Sobre mi' }),
    new ItemNavegacion({ url: '/proyectos', nombre: 'Proyectos' }),
    new ItemNavegacion({ url: '/blog', nombre: 'Blog' }),
    new ItemNavegacion({ url: '/contacto', nombre: 'Contacto' }),
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
