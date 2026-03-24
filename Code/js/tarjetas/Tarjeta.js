import Handlebars from 'handlebars';

export class Tarjeta {
  nombre = '';
  elemento = null;

  static template = Handlebars.compile(`<div class="{{nombre}}__cuerpo">
    <p class="{{nombre}}__fecha">
      <time datetime="{{fecha}}">{{fecha}}</time>
    </p>
    <h3 class="{{nombre}}__titulo">{{titulo}}</h3>
    <p class="{{nombre}}__descripcion">{{descripcion}}</p>
  </div>`);

  constructor({ fecha, titulo, descripcion }) {
    this.fecha = fecha;
    this.titulo = titulo;
    this.descripcion = descripcion;
  }

  getFecha() {
    return this.fecha;
  }

  setFecha(fecha) {
    this.fecha = fecha;
  }

  getTitulo() {
    return this.titulo;
  }

  setTitulo(titulo) {
    this.titulo = titulo;
  }

  getDescripcion() {
    return this.descripcion;
  }

  setDescripcion(descripcion) {
    this.descripcion = descripcion;
  }

  getTarjeta() {
    return this;
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
