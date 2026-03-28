import Handlebars from 'handlebars';
import { ComponenteBase } from './ComponenteBase.js';

export class Toast extends ComponenteBase {
  mensaje = undefined;
  static template = Handlebars.compile(`
    {{> toast mensaje=mensaje}}
  `);

  constructor(mensaje, clase) {
    super();
    this.mensaje = mensaje;
    this.clase = clase;
  }

  crearElemento() {
    let elemento = document.createElement('toast-elemento');
    elemento.classList.add(this.clase);
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  abrirToast() {
    document.body.appendChild(this.elemento);
  }

  getTemplate() {
    return Toast.template({
      mensaje: this.mensaje,
    });
  }

  static mostrar(mensaje, clase) {
    const toast = new Toast(mensaje, clase);
    toast.crearElemento();
    toast.abrirToast();
  }
}
