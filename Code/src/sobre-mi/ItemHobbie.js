import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemHobbie extends ComponenteBase {
  static template = Handlebars.compile(`
    {{> imagen nombre='hobbies' titulo=nombre imagen=imagen}}
    <h3 class="hobbies__nombre">{{nombre}}</h3>
  `);

  constructor(nombre, imagen) {
    super();
    this.nombre = nombre;
    this.imagen = imagen;
  }

  crearElemento() {
    let elemento = document.createElement('item-hobbie');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
    this.outerHTML = elemento.outerHTML;
  }

  getTemplate() {
    return ItemHobbie.template({
      nombre: this.nombre,
      imagen: this.imagen,
    });
  }
}
