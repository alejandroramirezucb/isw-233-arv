import Handlebars from 'handlebars';
import { Tarjeta } from '../tarjetas/Tarjeta.js';

export class ProyectosTarjeta extends Tarjeta {
  constructor(config) {
    super(config);
    this.imagenUrl = config.imagenUrl;
    this.nombre = 'proyectos';
  }

  getImagenUrl() {
    return this.imagenUrl;
  }

  setImagenUrl(imagenUrl) {
    this.imagenUrl = imagenUrl;
  }

  getContenido() {
    const templateString = `<figure class="{{nombre}}__figura">
      <img
        src="{{imagenUrl}}"
        alt="{{titulo}}"
        title="{{titulo}}"
        class="{{nombre}}__imagen" />
    </figure>`;

    const template = Handlebars.compile(templateString);

    return (
      template({
        nombre: this.nombre,
        imagenUrl: this.imagenUrl,
        titulo: this.titulo,
      }) + super.getContenido()
    );
  }
}
