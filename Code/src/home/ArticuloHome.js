import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ArticuloHome extends ComponenteBase {
  titulo = 'Alejandro Ramirez';
  contenido =
    'Desarrollador de software enfocado en experiencias web modernas.';

  static template = Handlebars.compile(`
    <h1 class="home__titulo">{{titulo}}</h1>
    <p class="home__texto">{{contenido}}</p>
  `);

  crearElemento() {
    const elemento = document.createElement('articulo-home');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return ArticuloHome.template({
      titulo: this.titulo,
      contenido: this.contenido,
    });
  }
}
