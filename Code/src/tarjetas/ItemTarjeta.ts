import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ItemTarjeta extends ComponenteBase {
  tipo: string | undefined = undefined;
  elemento: HTMLElement | null = null;
  outerHTML: string | null = null;
  fecha: string;
  titulo: string;
  descripcion: string;

  static template = Handlebars.compile(`
    <div class="{{tipo}}__cuerpo">
        <p class="{{tipo}}__fecha">{{fecha}}</p>
        <h3 class="{{tipo}}__titulo">{{titulo}}</h3>
        <p class="{{tipo}}__descripcion">{{descripcion}}</p>
    </div>`
  );

  constructor(config: { fecha: string; titulo: string; descripcion: string }) {
    super();
    this.fecha = Object.freeze(config.fecha);
    this.titulo = Object.freeze(config.titulo);
    this.descripcion = Object.freeze(config.descripcion);
  }

  crearElemento() {
    let elemento = document.createElement('item-tarjeta');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
    this.outerHTML = elemento.outerHTML;
  }

  esIgualA(otraTarjeta : ItemTarjeta) {
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
