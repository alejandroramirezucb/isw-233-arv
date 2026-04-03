import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemTarjeta extends ComponenteBase {
  protected tipo: string | undefined = undefined;
  protected fecha: string;
  protected titulo: string;
  protected descripcion: string;

  static template = Handlebars.compile(`
    <div class="{{tipo}}__cuerpo">
        <p class="{{tipo}}__fecha">{{fecha}}</p>
        <h3 class="{{tipo}}__titulo">{{titulo}}</h3>
        <p class="{{tipo}}__descripcion">{{descripcion}}</p>
    </div>`);

  constructor(options: { fecha: string; titulo: string; descripcion: string }) {
    super();
    this.fecha = Object.freeze(options.fecha);
    this.titulo = Object.freeze(options.titulo);
    this.descripcion = Object.freeze(options.descripcion);
  }

  crearElemento() {
    let elemento = document.createElement('item-tarjeta');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  esIgualA(otraTarjeta: ItemTarjeta) {
    return (
      otraTarjeta instanceof ItemTarjeta &&
      this.fecha === otraTarjeta.fecha &&
      this.titulo === otraTarjeta.titulo &&
      this.descripcion === otraTarjeta.descripcion
    );
  }

  getTemplate() {
    return ItemTarjeta.template({
      tipo: this.tipo,
      fecha: this.fecha,
      titulo: this.titulo,
      descripcion: this.descripcion,
    });
  }
}
