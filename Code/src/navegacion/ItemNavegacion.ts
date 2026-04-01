import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemNavegacion extends ComponenteBase {
  private url : string;
  private nombre : string;

  static template = Handlebars.compile(`
    <a
      href="{{url}}"
      class="navegacion__link"
      >{{nombre}}</a
    >
  `);

  constructor(options: { url: string; nombre: string }) {
    super();
    this.url = options.url;
    this.nombre = options.nombre;
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

  eventoClick(navegarA : (ruta: string) => void) {
    let link = this.elemento.querySelector('.navegacion__link');

    link.addEventListener('click', (event) => {
      event.preventDefault();
      navegarA(this.url);
    });
  }
}
