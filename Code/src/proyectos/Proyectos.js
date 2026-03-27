import Handlebars from 'handlebars';
import { ListaProyectosTarjetas } from './ListaProyectosTarjetas.js';

export class Proyectos {
  listaProyectos = new ListaProyectosTarjetas();
  elemento = null;

  static template = Handlebars.compile(`
    <h2 class="proyectos__titulo-principal">Proyectos</h2>
    <div class="proyectos__contenedor">
        {{#each proyectos}}
            {{{outerHTML}}}
        {{/each}}
    </div>
  `);

  crearElemento() {
    for (let tarjeta of this.listaProyectos.getTarjetas()) {
      tarjeta.crearElemento();
    }

    let elemento = document.createElement('section');
    elemento.classList.add('proyectos');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
    }

    return this.elemento;
  }

  getTemplate() {
    return Proyectos.template({
      proyectos: this.listaProyectos.getTarjetas(),
    });
  }

  renderizar() {
    const contenedor = document.querySelector('.contenido');
    contenedor.innerHTML = '';
    contenedor.appendChild(this.getElemento());
  }
}
