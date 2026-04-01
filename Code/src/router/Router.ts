import { Home } from '../home/Home.js';
import { SobreMi } from '../sobre-mi/SobreMi.js';
import { Proyectos } from '../proyectos/Proyectos.js';
import { Blog } from '../blog/Blog.js';
import { Contacto } from '../contacto/Contacto.js';

export class Router {
  home: Home = new Home();
  sobreMi: SobreMi = new SobreMi();
  proyectos: Proyectos = new Proyectos();
  blog: Blog = new Blog();
  contacto: Contacto = new Contacto();

  rutas = new Map<string, { renderizar: () => void }>([
    ['/', this.home],
    ['/sobre-mi', this.sobreMi],
    ['/proyectos', this.proyectos],
    ['/blog', this.blog],
    ['/contacto', this.contacto],
  ]);

  iniciar() {
    const rutaActual = window.location.pathname || '/';
    this.navegarA(rutaActual);
    this.eventoCambiar();
  }

  navegarA(ruta: string) {
    const seccion = this.rutas.get(ruta) || this.home;
    seccion.renderizar();
    history.pushState({}, '', ruta);
  }

  eventoCambiar() {
    window.addEventListener('popstate', (_) => {
      const rutaActual = window.location.pathname || '/';
      this.navegarA(rutaActual);
    });
  }
}
