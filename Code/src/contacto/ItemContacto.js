import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemContacto extends ComponenteBase {

  static template = Handlebars.compile(`
    {{> imagen nombre='contacto-item' titulo=titulo imagen=imagen}}
    <p class="contacto__texto">{{contenido}}</p>
  `);

  constructor(imagen, titulo, contenido) {
    super();
    this.imagen = imagen;
    this.titulo = titulo;
    this.contenido = contenido;
  }

  crearElemento() {
    const elemento = document.createElement('item-contacto');
elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return ItemContacto.template({
      imagen: this.imagen,
      titulo: this.titulo,
      contenido: this.contenido,
    });
  }
}
