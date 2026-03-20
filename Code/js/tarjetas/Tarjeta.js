import Handlebars from 'handlebars';

export class Tarjeta {
  nombre = '';
  elemento = null;

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
      elemento.innerHTML = this.getContenido();
      this.elemento = elemento;
    }

    return this.elemento;
  }

  getContenido() {
    const templateString = `<div class="{{nombre}}__cuerpo">
      <p class="{{nombre}}__fecha">
        <time datetime="{{fecha}}">{{fecha}}</time>
      </p>
      <h3 class="{{nombre}}__titulo">{{titulo}}</h3>
      <p class="{{nombre}}__descripcion">{{descripcion}}</p>
    </div>`;

    const template = Handlebars.compile(templateString);
    
    return template({
      nombre: this.nombre,
      fecha: this.fecha,
      titulo: this.titulo,
      descripcion: this.descripcion,
    });
  }
}
