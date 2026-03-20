import { Tarjeta } from '../tarjetas/Tarjeta.js';

export class ProyectosTarjeta extends Tarjeta {
  constructor(config) {
    super(config);
    this.imagenUrl = config.imagenUrl;
    this.name = 'proyectos';
  }

  getImagenUrl() {
    return this.imagenUrl;
  }

  setImagenUrl(imagenUrl) {
    this.imagenUrl = imagenUrl;
  }

  getContenido() {
    return `<figure class="${this.name}__figura">
      <img
        src="${this.imagenUrl}"
        alt="${this.titulo}"
        title="${this.titulo}"
        class="${this.name}__imagen" />
    </figure>
    ${super.getContenido()}`;
  }
}
