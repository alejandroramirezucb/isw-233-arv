import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemSkill extends ComponenteBase {
  static template = Handlebars.compile(`
    {{> imagen nombre='skills' titulo=nombre imagen=imagen}}
  `);

  constructor(nombre, imagen) {
    super();
    this.nombre = nombre;
    this.imagen = imagen;
  }

  crearElemento() {
    let elemento = document.createElement('item-skill');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
    this.outerHTML = elemento.outerHTML;
  }

  getTemplate() {
    return ItemSkill.template({
      nombre: this.nombre,
      imagen: this.imagen,
    });
  }
}
