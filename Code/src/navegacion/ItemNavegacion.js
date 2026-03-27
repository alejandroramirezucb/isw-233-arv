import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemNavegacion extends ComponenteBase {
  static template = Handlebars.compile(`
    <a
      href="{{url}}"
      class="navegacion__link"
      >{{nombre}}</a
    >
  `);

  constructor(url, nombre) {
    super();
    this.url = url;
    this.nombre = nombre;
  }

  crearElemento() {
    let elemento = document.createElement('item-navegacion');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return ItemNavegacion.template({
      url: this.url,
      nombre: this.nombre,
    });
  }

  eventoClick(navegarA) {
    let link = this.elemento.querySelector('.navegacion__link');

    link.addEventListener('click', (event) => {
      event.preventDefault();
      navegarA(this.url);
    });
  }
}
