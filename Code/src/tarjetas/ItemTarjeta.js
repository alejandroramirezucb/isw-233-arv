import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemTarjeta extends ComponenteBase {
  tipo = undefined;

  static template = Handlebars.compile(`
    <div class="{{tipo}}__cuerpo">
        <p class="{{tipo}}__fecha">{{fecha}}</p>
        <h3 class="{{tipo}}__titulo">{{titulo}}</h3>
        <p class="{{tipo}}__descripcion">{{descripcion}}</p>
    </div>`);

  constructor({ fecha, titulo, descripcion }) {
    super();
    this.fecha = Object.freeze(fecha);
    this.titulo = Object.freeze(titulo);
    this.descripcion = Object.freeze(descripcion);
  }

  crearElemento() {
    let elemento = document.createElement('item-tarjeta');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
    this.outerHTML = elemento.outerHTML;
  }

  esIgualA(otraTarjeta) {
    return (
      otraTarjeta instanceof ItemTarjeta &&
      this.fecha === otraTarjeta.fecha &&
      this.titulo === otraTarjeta.titulo &&
      this.descripcion === otraTarjeta.descripcion
    );
  }

  getTemplate() {
    return this.constructor.template({
      tipo: this.tipo,
      fecha: this.fecha,
      titulo: this.titulo,
      descripcion: this.descripcion,
    });
  }
}
