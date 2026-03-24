import Handlebars from 'handlebars';
import { Tarjeta } from '../tarjetas/Tarjeta.js';

export class ProyectosTarjeta extends Tarjeta {
  static imagenTemplate =
    Handlebars.compile(`<figure class="{{nombre}}__figura">
    <img
      src="{{imagenUrl}}"
      alt="{{titulo}}"
      title="{{titulo}}"
      class="{{nombre}}__imagen" />
  </figure>`);

  constructor(config) {
    super(config);
    this.imagenUrl = Object.freeze(config.imagenUrl);
    this.nombre = Object.freeze('proyectos');
  }

  getImagenUrl() {
    return this.imagenUrl;
  }

  esIgualA(otraTarjeta) {
    return super.esIgualA(otraTarjeta) &&
      this.imagenUrl === otraTarjeta.getImagenUrl();
  }

  getTemplate() {
    const imagenContenido = ProyectosTarjeta.imagenTemplate({
      nombre: this.nombre,
      imagenUrl: this.imagenUrl,
      titulo: this.titulo,
    });

    return imagenContenido + super.getTemplate();
  }
}
