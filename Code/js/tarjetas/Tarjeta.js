import Handlebars from 'handlebars';

export class Tarjeta {
  nombre = undefined;
  elemento = null;

  static template = Handlebars.compile(`<div class="{{nombre}}__cuerpo">
    <p class="{{nombre}}__fecha">
      <time datetime="{{fecha}}">{{fecha}}</time>
    </p>
    <h3 class="{{nombre}}__titulo">{{titulo}}</h3>
    <p class="{{nombre}}__descripcion">{{descripcion}}</p>
  </div>`);

  constructor({ fecha, titulo, descripcion }) {
    this.fecha = Object.freeze(fecha);
    this.titulo = Object.freeze(titulo);
    this.descripcion = Object.freeze(descripcion);
  }

  getFecha() {
    return this.fecha;
  }

  getTitulo() {
    return this.titulo;
  }

  getDescripcion() {
    return this.descripcion;
  }

  getTarjeta() {
    return this;
  }

  esIgualA(otraTarjeta) {
    return (otraTarjeta instanceof Tarjeta) &&
      this.fecha === otraTarjeta.getFecha() &&
      this.titulo === otraTarjeta.getTitulo() &&
      this.descripcion === otraTarjeta.getDescripcion();
  }

  getElemento() {
    if (!this.elemento) {
      let elemento = document.createElement('tarjeta-element');

      elemento.classList.add(`${this.nombre}__tarjeta`);
      elemento.crearShadow(this.getTemplate(), this.nombre);
      this.elemento = elemento;
    }

    return this.elemento;
  }

  getTemplate() {
    return Tarjeta.template({
      nombre: this.nombre,
      fecha: this.fecha,
      titulo: this.titulo,
      descripcion: this.descripcion,
    });
  }
}
