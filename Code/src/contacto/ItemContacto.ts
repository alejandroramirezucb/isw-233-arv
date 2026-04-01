import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemContacto extends ComponenteBase {
  private imagen: string;
  private titulo: string;
  private contenido: string;

  static template = Handlebars.compile(`
    {{> imagen nombre='contacto-item' titulo=titulo imagen=imagen}}
    <p class="contacto__texto">{{contenido}}</p>
  `);

  constructor(options: { imagen: string; titulo: string; contenido: string }) {
    super();
    this.imagen = options.imagen;
    this.titulo = options.titulo;
    this.contenido = options.contenido;
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
