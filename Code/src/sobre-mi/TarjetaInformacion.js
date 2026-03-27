import Handlebars from 'handlebars';

export class TarjetaInformacion {
  elemento = null;
  static template = Handlebars.compile(`
    <h2 class="{{nombre}}__titulo--principal">{{titulo}}</h2>
    <article class="{{nombre}}__tarjeta">
      {{> imagen nombre=nombre titulo=titulo imagen=imagen}}
      <h3 class="{{nombre}}__puesto">{{puesto}}</h3>
      <h4 class="{{nombre}}__institucion">{{institucion}}</h4>
      <p class="{{nombre}}__fecha">{{fecha}}</p>
      <p class="{{nombre}}__contenido">{{contenido}}</p>
    </article>
  `);

  constructor(config) {
    this.nombre = config.nombre;
    this.titulo = config.titulo;
    this.imagen = config.imagen;
    this.puesto = config.puesto;
    this.institucion = config.institucion;
    this.contenido = config.contenido;
    this.fecha = config.fecha;
  }

  crearElemento() {
    let elemento = document.createElement('tarjeta-informacion');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
    this.outerHTML = elemento.outerHTML;
  }

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
    }

    return this.elemento;
  }

  getTemplate() {
    return TarjetaInformacion.template({
      nombre: this.nombre,
      titulo: this.titulo,
      imagen: this.imagen,
      puesto: this.puesto,
      institucion: this.institucion,
      contenido: this.contenido,
      fecha: this.fecha,
    });
  }
}
