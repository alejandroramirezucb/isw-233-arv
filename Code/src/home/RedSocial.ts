import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class RedSocial extends ComponenteBase {
  private nombre: string;
  private url: string;
  private imagen: string;

  static template = Handlebars.compile(`
    {{> imagen nombre='home-red-social' titulo=nombre imagen=imagen}}
  `);

  constructor(options: { nombre: string; url: string; imagen: string }) {
    super();
    this.nombre = options.nombre;
    this.url = options.url;
    this.imagen = options.imagen;
  }

  crearElemento() {
    const elemento = document.createElement('red-social');
    elemento.setAttribute('href', this.url);
    elemento.setAttribute('aria-label', this.nombre);
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return RedSocial.template({
      nombre: this.nombre,
      titulo: this.nombre,
      imagen: this.imagen,
    });
  }
}
