import Handlebars from 'handlebars';
import { RedSocial } from './RedSocial.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaRedesSociales extends ComponenteBase {
  private items = [
    new RedSocial({
      nombre: 'Email',
      url: 'mailto:alejandro.ramirez.v@ucb.edu.bo',
      imagen: 'images/icon-email.svg',
    }),
    new RedSocial({
      nombre: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alejandro-ramirez-vallejos/',
      imagen: 'images/icon-linkedin.svg',
    }),
    new RedSocial({
      nombre: 'Github',
      url: 'https://github.com/alejandroramirezvallejos/',
      imagen: 'images/icon-github.svg',
    }),
    new RedSocial({
      nombre: 'X',
      url: 'https://x.com/',
      imagen: 'images/icon-x.svg',
    }),
  ];

  static template = Handlebars.compile(`
    {{#each items}}
      {{{outerHTML}}}
    {{/each}}
  `);

  crearElemento() {
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
