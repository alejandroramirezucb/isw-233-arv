import { ListaNavegacion } from './ListaNavegacion.js';
import { Router } from '../router/Router.js';

export class Navegacion {
  static instancia = null;
  elemento = null;
  listaNavegacion = new ListaNavegacion();
  router = new Router();

  static getInstancia() {
    if (!this.instancia) {
      this.instancia = new Navegacion();
    }

    return this.instancia;
  }

  crearElemento() {
    const elemento = document.createElement('nav');
    elemento.classList.add('navegacion');
    elemento.setAttribute('aria-label', 'Navegación');
    elemento.appendChild(this.listaNavegacion.getElemento());
    this.elemento = elemento;
    this.eventoPorItemNavegacion();
    this.router.iniciar();
  }

  getElemento() {
    if (!this.elemento) {
      this.crearElemento();
    }

    return this.elemento;
  }

  eventoPorItemNavegacion() {
    for (let item of this.listaNavegacion.getItems()) {
      item.eventoClick(this.router.navegarA.bind(this.router));
    }
  }

  renderizar() {
    const contenedor = document.querySelector('.encabezado');
    if (!contenedor.querySelector('.navegacion')) {
      contenedor.appendChild(this.getElemento());
    }
  }
}
