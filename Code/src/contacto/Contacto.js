import Handlebars from 'handlebars';
import { ListaContacto } from './ListaContacto.js';
import { FormularioContacto } from './FormularioContacto.js';

export class Contacto {
  elemento = null;
  listaContacto = new ListaContacto();
  formulario = new FormularioContacto();

  static template = Handlebars.compile(`
    <section id="contacto" class="contacto">
      <h2 class="contacto__titulo">Contáctame</h2>
      <div class="contacto__contenedor">
        {{{listaContenido}}}
        {{{formulario}}}
      </div>
    </section>
  `);

  crearElemento() {
    const elemento = document.createElement('section');
    elemento.classList.add('contacto');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento.firstElementChild;
  }

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
    }

    return this.elemento;
  }

  getTemplate() {
    return Contacto.template({
      listaContenido: this.listaContacto.getElemento().outerHTML,
      formulario: this.formulario.getElemento().outerHTML,
    });
  }

  renderizar() {
    const contenedor = document.querySelector('.contenido');
    contenedor.innerHTML = '';
    contenedor.appendChild(this.getElemento());
  }
}
