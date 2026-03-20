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
    return `<figure class="${this.nombre}__figura">
      <img
        src="${this.imagenUrl}"
        alt="${this.titulo}"
        title="${this.titulo}"
        class="${this.nombre}__imagen" />
    </figure>
    ${super.getContenido()}`;
  }
}
