import Handlebars from 'handlebars';
import { GrupoSkills } from './GrupoSkills.js';
import { ItemSkill } from './ItemSkill.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class ListaSkills extends ComponenteBase {
  grupos = [
    new GrupoSkills({
      subtitulo: 'Lenguajes de Programación',
      items: [
        new ItemSkill({
          nombre: 'C',
          imagen: 'https://skillicons.dev/icons?i=c',
        }),
        new ItemSkill({
          nombre: 'C++',
          imagen: 'https://skillicons.dev/icons?i=cpp',
        }),
        new ItemSkill({
          nombre: 'C#',
          imagen: 'https://skillicons.dev/icons?i=cs',
        }),
        new ItemSkill({
          nombre: 'JavaScript',
          imagen: 'https://skillicons.dev/icons?i=js',
        }),
        new ItemSkill({
          nombre: 'TypeScript',
          imagen: 'https://skillicons.dev/icons?i=ts',
        }),
        new ItemSkill({
          nombre: 'Java',
          imagen: 'https://skillicons.dev/icons?i=java',
        }),
        new ItemSkill({
          nombre: 'R',
          imagen: 'https://skillicons.dev/icons?i=r',
        }),
        new ItemSkill({
          nombre: 'Python',
          imagen: 'https://skillicons.dev/icons?i=py',
        }),
      ],
    }),
    new GrupoSkills({
      subtitulo: 'Desarrollo Frontend',
      items: [
        new ItemSkill({
          nombre: 'HTML5',
          imagen: 'https://skillicons.dev/icons?i=html',
        }),
        new ItemSkill({
          nombre: 'CSS3',
          imagen: 'https://skillicons.dev/icons?i=css',
        }),
        new ItemSkill({
          nombre: 'JavaScript',
          imagen: 'https://skillicons.dev/icons?i=js',
        }),
        new ItemSkill({
          nombre: 'TypeScript',
          imagen: 'https://skillicons.dev/icons?i=ts',
        }),
        new ItemSkill({
          nombre: 'Angular',
          imagen: 'https://skillicons.dev/icons?i=angular',
        }),
      ],
    }),
    new GrupoSkills({
      subtitulo: 'Desarrollo Backend',
      items: [
        new ItemSkill({
          nombre: 'C#',
          imagen: 'https://skillicons.dev/icons?i=cs',
        }),
        new ItemSkill({
          nombre: '.NET',
          imagen: 'https://skillicons.dev/icons?i=dotnet',
        }),
        new ItemSkill({
          nombre: 'MongoDB',
          imagen: 'https://skillicons.dev/icons?i=mongodb',
        }),
        new ItemSkill({
          nombre: 'PostgreSQL',
          imagen: 'https://skillicons.dev/icons?i=postgres',
        }),
      ],
    }),
    new GrupoSkills({
      subtitulo: 'Herramientas',
      items: [
        new ItemSkill({
          nombre: 'Git',
          imagen: 'https://skillicons.dev/icons?i=git',
        }),
        new ItemSkill({
          nombre: 'Figma',
          imagen: 'https://skillicons.dev/icons?i=figma',
        }),
        new ItemSkill({
          nombre: 'LaTeX',
          imagen: 'https://skillicons.dev/icons?i=latex',
        }),
      ],
    }),
  ];

  static template = Handlebars.compile(`
	{{#each grupos}}
		{{{outerHTML}}}
	{{/each}}
  `);

  crearElemento() {
    this.grupos.forEach(grupo => grupo.getElemento());
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
