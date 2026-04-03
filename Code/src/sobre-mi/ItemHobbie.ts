import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemHobbie extends ComponenteBase {
  private nombre: string;
  private imagen: string

  static template = Handlebars.compile(`
    {{> imagen nombre='hobbies' titulo=nombre imagen=imagen}}
    <h3 class="hobbies__nombre">{{nombre}}</h3>
  `);

  constructor(options : { nombre: string; imagen: string }) {
    super();
    this.nombre = options.nombre;
    this.imagen = options.imagen;
  }

  crearElemento() {
    let elemento = document.createElement('item-hobbie');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return ItemHobbie.template({
      nombre: this.nombre,
      imagen: this.imagen,
    });
  }
}
