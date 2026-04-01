import { ListaNavegacion } from './ListaNavegacion.js';
import { Router } from '../router/Router.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class Navegacion extends ComponenteBase {
  static instancia : Navegacion | null = null;
  private listaNavegacion = new ListaNavegacion();
  private router = new Router();
  
  private constructor(){
    super();
  }

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
