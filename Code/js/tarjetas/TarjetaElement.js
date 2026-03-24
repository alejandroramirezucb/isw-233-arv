import Handlebars from 'handlebars';
import estiloBlog from '../../blocks/blog.css?inline';
import estiloProyectos from '../../blocks/proyectos.css?inline';

export class TarjetaElement extends HTMLElement {
  static css = {
    blog: estiloBlog,
    proyectos: estiloProyectos
  };

  static template = Handlebars.compile(`
    <style>{{{css}}}</style>
    {{{html}}}
    `);

  connectedCallback() {
    this.setAttribute('role', 'article');
  }

  crearShadow(html, nombre){
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }

    this.shadowRoot.innerHTML = this.getTemplate(html, nombre);
  }

  getTemplate(html, nombre){
    return TarjetaElement.template({
      css: TarjetaElement.css[nombre],
      html: html,
    });
  }
}

customElements.define('tarjeta-element', TarjetaElement);
