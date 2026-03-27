import Handlebars from 'handlebars';
import { ItemTarjeta } from '../tarjetas/ItemTarjeta.js';

export class ItemProyectosTarjeta extends ItemTarjeta {
  static imagenTemplate = Handlebars.compile(`
    {{> imagen nombre=nombre imagen=imagenUrl titulo=titulo}}
  `);

  constructor(config) {
    super(config);
    this.tipo = 'proyectos';
    this.imagenUrl = Object.freeze(config.imagenUrl);
    this.nombre = Object.freeze('proyectos');
  }

  esIgualA(otraTarjeta) {
    return (
      super.esIgualA(otraTarjeta) &&
      this.imagenUrl === otraTarjeta.getImagenUrl()
    );
  }

  getTemplate() {
    const imagenContenido = ItemProyectosTarjeta.imagenTemplate({
      nombre: this.nombre,
      imagenUrl: this.imagenUrl,
      titulo: this.titulo,
    });

    return imagenContenido + super.getTemplate();
  }
}
