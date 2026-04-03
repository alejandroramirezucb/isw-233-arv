import Handlebars from 'handlebars';
import { ArticuloHome } from './ArticuloHome.js';
import { ListaRedesSociales } from './ListaRedesSociales.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class Home extends ComponenteBase {
  private imagen: string = 'images/foto-perfil.png';
  private url: string = '/contacto';
  private articulo: ArticuloHome = new ArticuloHome();
  private listaRedesSociales: ListaRedesSociales = new ListaRedesSociales();

  static template = Handlebars.compile(`
    {{> imagen nombre='home' titulo=titulo imagen=imagen}}
    <div class="home__contenido">
      {{{articulo}}}
      <div class="home__redes-sociales">
        {{#each redesSociales}}
          {{{outerHTML}}}
        {{/each}}
      </div>
      {{> boton tipo='button' texto=textoBoton onclick=onclick clases=clasesBoton}}
    </div>
  `);

  crearElemento() {
    this.listaRedesSociales.getItems().forEach(item => item.getElemento());
    const elemento = document.createElement('section');
    elemento.classList.add('home');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return Home.template({
      titulo: this.articulo.getTitulo(),
      imagen: this.imagen,
      articulo: this.articulo.getElemento().outerHTML,
      redesSociales: this.listaRedesSociales.getItems(),
      textoBoton: 'Contactame',
      clasesBoton: 'home__boton',
      onclick: `location.href = '${this.url}'`,
    });
  }

  renderizar() {
    const contenedor = document.querySelector('.contenido');
    contenedor.innerHTML = '';
    contenedor.appendChild(this.getElemento());
  }
}
