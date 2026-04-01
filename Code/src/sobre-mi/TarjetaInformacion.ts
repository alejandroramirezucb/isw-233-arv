import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase';

export class TarjetaInformacion extends ComponenteBase{
  private nombre: string;
  private titulo: string
  private imagen: string;
  private puesto: string;
  private institucion: string
  private contenido: string;
  private fecha: string;
  private outerHTML: string | null = null;

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

  constructor(options: {
    nombre: string;
    titulo: string;
    imagen: string;
    puesto: string;
    institucion: string;
    contenido: string;
    fecha: string;
  }) {
    super();
    this.nombre = options.nombre;
    this.titulo = options.titulo;
    this.imagen = options.imagen;
    this.puesto = options.puesto;
    this.institucion = options.institucion;
    this.contenido = options.contenido;
    this.fecha = options.fecha;
  }

  crearElemento() {
    let elemento = document.createElement('tarjeta-informacion');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
    this.outerHTML = elemento.outerHTML;
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
