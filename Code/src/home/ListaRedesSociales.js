import Handlebars from 'handlebars';
import { RedSocial } from './RedSocial.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaRedesSociales extends ComponenteBase {
  items = [
    new RedSocial(
      'Email',
      'mailto:alejandro.ramirez.v@ucb.edu.bo',
      'images/icon-email.svg',
    ),
    new RedSocial(
      'LinkedIn',
      'https://www.linkedin.com/in/alejandro-ramirez-vallejos/',
      'images/icon-linkedin.svg',
    ),
    new RedSocial(
      'Github',
      'https://github.com/alejandroramirezvallejos/',
      'images/icon-github.svg',
    ),
    new RedSocial('X', 'https://x.com/', 'images/icon-x.svg'),
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

    const elemento = document.createElement('lista-redes-sociales');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getItems() {
    return this.items;
  }

  getTemplate() {
    return ListaRedesSociales.template({
      items: this.items,
    });
  }
}
