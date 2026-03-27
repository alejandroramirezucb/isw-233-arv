import Handlebars from 'handlebars';
import { ItemHobbie } from './ItemHobbie.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaHobbies extends ComponenteBase {
  items = [
    new ItemHobbie('Programar', 'images/icon-programar.svg'),
    new ItemHobbie('Diseñar', 'images/icon-diseñar.svg'),
    new ItemHobbie('Viajar', 'images/icon-viajar.svg'),
    new ItemHobbie('Leer', 'images/icon-leer.svg'),
  ];

  static template = Handlebars.compile(`
    {{#each items}}
        {{{outerHTML}}}
    {{/each}}
  `);

  crearElemento() {
    for (let item of this.items) {
      item.crearElemento();
    }

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
