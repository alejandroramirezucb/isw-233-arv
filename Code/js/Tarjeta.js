export class Tarjeta {
  name = '';
  elemento = null;

  constructor({ fecha, titulo, descripcion }) {
    this.fecha = fecha;
    this.titulo = titulo;
    this.descripcion = descripcion;
  }

  getFecha() {
    return this.fecha;
  }

  setFecha(fecha) {
    this.fecha = fecha;
  }

  getTitulo() {
    return this.titulo;
  }

  setTitulo(titulo) {
    this.titulo = titulo;
  }

  getDescripcion() {
    return this.descripcion;
  }

  setDescripcion(descripcion) {
    this.descripcion = descripcion;
  }

  getTarjeta() {
    return this;
  }

  getElemento() {
    if (!this.elemento) {
      let elemento = document.createElement('article');

      elemento.classList.add(`${this.name}__tarjeta`);
      elemento.innerHTML = this.getContenido();
      this.elemento = elemento;
    }

    return this.elemento;
  }

  getContenido() {
    return `<div class="${this.name}__cuerpo">
          <p class="${this.name}__fecha">
            <time datetime="${this.fecha}">${this.fecha}</time>
          </p>
          <h3 class="${this.name}__titulo">${this.titulo}</h3>
          <p class="${this.name}__descripcion">${this.descripcion}</p>
      </div>`;
  }
}
