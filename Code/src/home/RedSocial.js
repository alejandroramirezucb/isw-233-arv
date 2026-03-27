import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class RedSocial extends ComponenteBase {
  static template = Handlebars.compile(`
    {{> imagen nombre='home-red-social' titulo=nombre imagen=imagen}}
  `);

  constructor(nombre, url, imagen) {
    super();
    this.nombre = nombre;
    this.url = url;
    this.imagen = imagen;
  }

  crearElemento() {
    const elemento = document.createElement('red-social');
    elemento.setAttribute('href', this.url);
    elemento.setAttribute('aria-label', this.nombre);
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
    this.outerHTML = elemento.outerHTML;
  }

  getTemplate() {
    return RedSocial.template({
      nombre: this.nombre,
      titulo: this.nombre,
      imagen: this.imagen,
    });
  }
}
