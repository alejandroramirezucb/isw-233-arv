import Handlebars from 'handlebars';
import { ItemContacto } from './ItemContacto.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaContacto extends ComponenteBase {

  items = [
    new ItemContacto(
      'images/icon-contenedor-direccion.svg',
      'Icono de dirección',
      'Santa Cruz de la Sierra, Bolivia',
    ),
    new ItemContacto(
      'images/icon-contenedor-telefono.svg',
      'Icono de teléfono',
      '+1235 2355 98',
    ),
    new ItemContacto(
      'images/icon-contenedor-email.svg',
      'Icono de Email',
      'info@alejandroramirez.com',
    ),
    new ItemContacto(
      'images/icon-contenedor-web.svg',
      'Icono de mi Web',
      'www.alejandroramirez.com',
    ),
  ];

  static template = Handlebars.compile(`
    <h3 id="contacto__subtitulo" class="contacto__subtitulo">Mi información</h3>
    <ul class="contacto__items" aria-labelledby="contacto__subtitulo">
      {{#each items}}
        <li class="contacto__item">
          {{{this}}}
        </li>
      {{/each}}
    </ul>
  `);

  crearElemento() {
    const elemento = document.createElement('lista-contacto');
elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    const items = [];
    for (let item of this.items) {
      items.push(item.getElemento().outerHTML);
    }

    return ListaContacto.template({
      items,
    });
  }
}
