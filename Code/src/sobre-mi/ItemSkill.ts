import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemSkill extends ComponenteBase {
  private nombre: string;
  private imagen: string;

  static template = Handlebars.compile(`
    {{> imagen nombre='skills' titulo=nombre imagen=imagen}}
  `);

  constructor(options : { nombre: string; imagen: string }) {
    super();
    this.nombre = options.nombre;
    this.imagen = options.imagen;
  }

  crearElemento() {
    let elemento = document.createElement('item-skill');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return ItemSkill.template({
      nombre: this.nombre,
      imagen: this.imagen,
    });
  }
}
