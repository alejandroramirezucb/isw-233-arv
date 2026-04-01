import Handlebars from 'handlebars';
import { ListaProyectosTarjetas } from './ListaProyectosTarjetas.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class Proyectos extends ComponenteBase {
  private listaProyectos = new ListaProyectosTarjetas();

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
