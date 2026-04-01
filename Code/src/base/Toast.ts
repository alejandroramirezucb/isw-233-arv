import Handlebars from 'handlebars';
import { ComponenteBase } from './ComponenteBase.js';

export class Toast extends ComponenteBase {
  private mensaje : string;
  private clase : string;

  static template = Handlebars.compile(`
    {{> toast mensaje=mensaje}}
  `);

  constructor(options : { mensaje: string, clase: string }) {
    super();
    this.mensaje = options.mensaje;
    this.clase = options.clase;
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

  static mostrar(options : { mensaje: string, clase: string }) {
    const toast = new Toast(options);
    toast.crearElemento();
    toast.abrirToast();
  }
}
