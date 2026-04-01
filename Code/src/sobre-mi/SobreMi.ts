import Handlebars from 'handlebars';
import { TarjetaInformacion } from './TarjetaInformacion.js';
import { ListaSkills } from './ListaSkills.js';
import { ListaHobbies } from './ListaHobbies.js';
import { ComponenteBase } from '../base/ComponenteBase.js';

export class SobreMi extends ComponenteBase {
  private educacion = new TarjetaInformacion({
    nombre: 'educacion',
    titulo: 'Educación',
    imagen: 'images/icon-education.svg',
    puesto: 'Ingeniería de Software',
    institucion: 'Universidad Católica Boliviana',
    fecha: '2024 - Presente',
    contenido:
      'Actualmente curso el quinto semestre, habiendo avanzado estructuras de datos, análisis de algoritmos, gestión de bases de datos y desarrollo full-stack.',
  });

  private experiencia = new TarjetaInformacion({
    nombre: 'experiencia',
    titulo: 'Experiencia',
    imagen: 'images/icon-experiencia.svg',
    puesto: 'Ayudantía de Introducción a la Programación',
    institucion: 'Universidad Católica Boliviana',
    fecha: '2025',
    contenido:
      'Guié a estudiantes en ejercicios prácticos y exámenes simulados de Introducción a la Programación, reforzando fundamentos y pensamiento analítico.',
  });

  private listaSkills = new ListaSkills();
  private listaHobbies = new ListaHobbies();

  static template = Handlebars.compile(`
    {{{educacion.outerHTML}}}
    {{{experiencia.outerHTML}}}
    {{> seccion
      nombre='skills'
      titulo='Skills'
      contenido=skillsContenido
    }}
    {{> seccion
      nombre='hobbies'
      titulo='Hobbies'
      contenido=hobbiesContenido
    }}
 `);

  crearElemento() {
    this.educacion.crearElemento();
    this.experiencia.crearElemento();
    const elemento = document.createElement('section');
    elemento.classList.add('sobre-mi');
    elemento.innerHTML = this.getTemplate();
    this.elemento = elemento;
  }

  getTemplate() {
    return SobreMi.template({
      educacion: this.educacion,
      experiencia: this.experiencia,
      skillsContenido: this.listaSkills.getElemento().outerHTML,
      hobbiesContenido: this.listaHobbies.getElemento().outerHTML,
    });
  }

  renderizar() {
    const contenedor = document.querySelector('.contenido');
    contenedor.innerHTML = '';
    contenedor.appendChild(this.getElemento());
  }
}
