import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class FormularioContacto extends ComponenteBase {

  static template = Handlebars.compile(`
    {{> campoMensaje
      contenedor='contacto'
      nombre='mensaje'
      etiqueta=etiquetaMensaje
      placeholder=placeholderMensaje
    }}

    {{> campoTexto
      contenedor='contacto'
      nombre='nombre'
      etiqueta=etiquetaNombre
      tipo='text'
      placeholder=placeholderNombre
    }}

    {{> campoTexto
      contenedor='contacto'
      nombre='email'
      etiqueta=etiquetaEmail
      tipo='email'
      placeholder=placeholderEmail
    }}

    {{> boton
      tipo='submit'
      texto=textoBoton
      clases='contacto__boton'
    }}
  `);

  crearElemento() {
    const elemento = document.createElement('formulario-contacto');
elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return FormularioContacto.template({
      etiquetaMensaje: 'Mensaje',
      placeholderMensaje: 'Mensaje...',
      etiquetaNombre: 'Nombre',
      placeholderNombre: 'Nombre...',
      etiquetaEmail: 'Correo',
      placeholderEmail: 'Correo...',
      textoBoton: 'Enviar',
    });
  }
}
