import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class GrupoSkills extends ComponenteBase {

  static template = Handlebars.compile(`
	<h3 class="skills__subtitulo">{{subtitulo}}</h3>
	<ul role="list">
		{{#each items}}
      {{{outerHTML}}}
		{{/each}}
	</ul>
  `);

  constructor(subtitulo, items) {
    super();
    this.subtitulo = subtitulo;
    this.items = items;
  }

  crearElemento() {
    for (let item of this.items) {
      item.crearElemento();
    }

    const elemento = document.createElement('grupo-skills');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
    this.outerHTML = elemento.outerHTML;
  }

  getTemplate() {
    return GrupoSkills.template({
      subtitulo: this.subtitulo,
      items: this.items,
    });
  }
}
