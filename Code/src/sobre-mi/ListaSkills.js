import Handlebars from 'handlebars';
import { GrupoSkills } from './GrupoSkills.js';
import { ItemSkill } from './ItemSkill.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaSkills extends ComponenteBase {

  grupos = [
    new GrupoSkills('Lenguajes de Programación', [
      new ItemSkill('C', 'https://skillicons.dev/icons?i=c'),
      new ItemSkill('C++', 'https://skillicons.dev/icons?i=cpp'),
      new ItemSkill('C#', 'https://skillicons.dev/icons?i=cs'),
      new ItemSkill('JavaScript', 'https://skillicons.dev/icons?i=js'),
      new ItemSkill('TypeScript', 'https://skillicons.dev/icons?i=ts'),
      new ItemSkill('Java', 'https://skillicons.dev/icons?i=java'),
      new ItemSkill('R', 'https://skillicons.dev/icons?i=r'),
      new ItemSkill('Python', 'https://skillicons.dev/icons?i=py'),
    ]),
    new GrupoSkills('Desarrollo Frontend', [
      new ItemSkill('HTML5', 'https://skillicons.dev/icons?i=html'),
      new ItemSkill('CSS3', 'https://skillicons.dev/icons?i=css'),
      new ItemSkill('JavaScript', 'https://skillicons.dev/icons?i=js'),
      new ItemSkill('TypeScript', 'https://skillicons.dev/icons?i=ts'),
      new ItemSkill('Angular', 'https://skillicons.dev/icons?i=angular'),
    ]),
    new GrupoSkills('Desarrollo Backend', [
      new ItemSkill('C#', 'https://skillicons.dev/icons?i=cs'),
      new ItemSkill('.NET', 'https://skillicons.dev/icons?i=dotnet'),
      new ItemSkill('MongoDB', 'https://skillicons.dev/icons?i=mongodb'),
      new ItemSkill('PostgreSQL', 'https://skillicons.dev/icons?i=postgres'),
    ]),
    new GrupoSkills('Herramientas', [
      new ItemSkill('Git', 'https://skillicons.dev/icons?i=git'),
      new ItemSkill('Figma', 'https://skillicons.dev/icons?i=figma'),
      new ItemSkill('LaTeX', 'https://skillicons.dev/icons?i=latex'),
    ]),
  ];

  static template = Handlebars.compile(`
	{{#each grupos}}
		{{{outerHTML}}}
	{{/each}}
  `);

  crearElemento() {
    for (let grupo of this.grupos) {
      grupo.crearElemento();
    }

    const elemento = document.createElement('lista-skills');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return ListaSkills.template({
      grupos: this.grupos,
    });
  }
}
