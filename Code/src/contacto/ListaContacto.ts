import Handlebars from 'handlebars';
import { ItemContacto } from './ItemContacto.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaContacto extends ComponenteBase {
  private items = [
    new ItemContacto({
      imagen: 'images/icon-contenedor-direccion.svg',
      titulo: 'Icono de dirección',
      contenido: 'Santa Cruz de la Sierra, Bolivia',
    }),
    new ItemContacto({
      imagen: 'images/icon-contenedor-telefono.svg',
      titulo: 'Icono de teléfono',
      contenido: '+1235 2355 98',
    }),
    new ItemContacto({
      imagen: 'images/icon-contenedor-email.svg',
      titulo: 'Icono de Email',
      contenido: 'info@alejandroramirez.com',
    }),
    new ItemContacto({
      imagen: 'images/icon-contenedor-web.svg',
      titulo: 'Icono de mi Web',
      contenido: 'www.alejandroramirez.com',
    }),
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
