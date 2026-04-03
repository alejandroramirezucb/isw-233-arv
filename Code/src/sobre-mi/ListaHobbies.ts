import Handlebars from 'handlebars';
import { ItemHobbie } from './ItemHobbie.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaHobbies extends ComponenteBase {
  private items = [
    new ItemHobbie({ nombre: 'Programar', imagen: 'images/icon-programar.svg' }),
    new ItemHobbie({ nombre: 'Diseñar', imagen: 'images/icon-diseñar.svg' }),
    new ItemHobbie({ nombre: 'Viajar', imagen: 'images/icon-viajar.svg' }),
    new ItemHobbie({ nombre: 'Leer', imagen: 'images/icon-leer.svg' }),
  ];

  static template = Handlebars.compile(`
    {{#each items}}
        {{{outerHTML}}}
    {{/each}}
  `);

  crearElemento() {
    this.items.forEach(item => item.getElemento());
    let elemento = document.createElement('lista-hobbies');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return ListaHobbies.template({
      items: this.items,
    });
  }
}
