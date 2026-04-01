import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';
import './HTMLModalBlog.js';

export class ModalBlog extends ComponenteBase {
  protected botonTexto: string | undefined = undefined;
  private titulo: string;
  private categorias: string[];

  static template = Handlebars.compile(`
    <div class="modal-blog__cabecera">
      <h3 class="modal-blog__titulo">{{titulo}}</h3>
    </div> 
    <div class="modal-blog__cuerpo">
      {{> formulario-blog
        nombre=nombre 
        categorias=categorias
        placeholderCategoria=placeholderCategoria
        placeholderFecha=placeholderFecha
        placeholderTitulo=placeholderTitulo
        placeholderDescripcion=placeholderDescripcion
      }}
      {{> boton texto=botonTexto tipo="submit" clases="modal-blog__boton-accion"}}
      {{> boton texto="Cerrar" tipo="submit" clases="modal-blog__boton-cerrar"}}
    </div>
  `);

  constructor(options: { titulo: string; categorias: string[] }) {
    super();
    this.titulo = options.titulo;
    this.categorias = options.categorias;
  }

  crearElemento() {
    let elemento = document.createElement('modal-blog');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
    this.eventoClickCerrar();
  }

  getTemplate() {
    return ModalBlog.template({
      titulo: this.titulo,
      nombre: 'modal-blog',
      clases: '',
      categorias: this.categorias,
      placeholderCategoria: 'Selecciona una categoría',
      placeholderFecha: 'Selecciona una fecha',
      placeholderTitulo: 'Escribe el título del blog',
      placeholderDescripcion: 'Escribe la descripción del blog',
      botonTexto: this.botonTexto,
    });
  }

  abrirModal() {
    document.body.appendChild(this.elemento);
  }

  cerrarModal() {
    this.elemento.remove();
  }

  eventoClickCerrar() {
    let boton = this.elemento.querySelector('.modal-blog__boton-cerrar');

    boton.addEventListener('click', (evento) => {
      evento.preventDefault();
      this.cerrarModal();
    });
  }
}
