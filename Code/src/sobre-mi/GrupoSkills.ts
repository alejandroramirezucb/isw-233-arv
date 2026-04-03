import Handlebars from 'handlebars';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class GrupoSkills extends ComponenteBase {
  private subtitulo: string;
  private items: ComponenteBase[];

  static template = Handlebars.compile(`
	<h3 class="skills__subtitulo">{{subtitulo}}</h3>
	<ul role="list">
		{{#each items}}
      {{{outerHTML}}}
		{{/each}}
	</ul>
  `);

  constructor(options: { subtitulo: string; items: ComponenteBase[] }) {
    super();
    this.subtitulo = options.subtitulo;
    this.items = options.items;
  }

  crearElemento() {
    const elemento = document.createElement('grupo-skills');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return GrupoSkills.template({
      subtitulo: this.subtitulo,
      items: this.items,
    });
  }
}
