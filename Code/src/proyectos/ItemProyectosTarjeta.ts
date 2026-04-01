import Handlebars from 'handlebars';
import { ItemTarjeta } from '../tarjetas/ItemTarjeta.js';

export class ItemProyectosTarjeta extends ItemTarjeta {
  private imagenUrl: string;
  private nombre: string;

  static imagenTemplate = Handlebars.compile(`
    {{> imagen nombre=nombre imagen=imagenUrl titulo=titulo}}
  `);

  constructor(options: {
    fecha: string;
    titulo: string;
    descripcion: string;
    imagenUrl: string;
  }) {
    super({
      fecha: options.fecha,
      titulo: options.titulo,
      descripcion: options.descripcion,
    });
    this.tipo = 'proyectos';
    this.imagenUrl = Object.freeze(options.imagenUrl);
    this.nombre = Object.freeze('proyectos');
  }

  esIgualA(otraTarjeta: ItemTarjeta) {
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

  getImagenUrl() {
    return this.imagenUrl;
  }
}
