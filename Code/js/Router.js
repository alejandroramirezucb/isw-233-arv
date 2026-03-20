export class Router {
  static secciones = new Map([
    ['introduccion', '/'],
    ['sobre-mi', '/sobre-mi'],
    ['proyectos', '/proyectos'],
    ['blog', '/blog'],
    ['contacto', '/contacto'],
  ]);

  static iniciar() {
    this.ocultarDiferentesA('introduccion');
    this.cambiarUrl();
  }

  static navegarA(clase) {
    let seccion = document.getElementById(clase);
    let ruta = this.secciones.get(clase) || '/';

    seccion.hidden = false;
    this.ocultarDiferentesA(clase);
    window.history.pushState(null, '', ruta);
  }

  static ocultarDiferentesA(clase) {
    for (let [claseNombre, _] of this.secciones) {
      let seccion = document.getElementById(claseNombre);

      if (claseNombre !== clase) {
        seccion.hidden = true;
      }
    }
  }

  static cambiarUrl() {
    window.addEventListener('popstate', (_) => {
      let rutaActual = window.location.pathname || '/';

      for (let [clase, ruta] of this.secciones) {
        if (ruta === rutaActual) {
          this.navegarA(clase);
          break;
        }
      }
    });
  }
}
