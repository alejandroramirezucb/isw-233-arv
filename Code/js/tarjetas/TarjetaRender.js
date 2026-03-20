import { Render } from '../Render.js';
import { BlogTarjetaRepository } from '../blog/BlogTarjetaRepository.js';

export class TarjetaRender extends Render {
  static renderTarjetas(contenedor, tarjetas) {
    contenedor.replaceChildren();

    for (let tarjeta of tarjetas) {
      this.render(contenedor, tarjeta.getElemento());
    }
  }

  static renderTarjetasRepositorio(repositorio) {
    document.addEventListener('DOMContentLoaded', () => {
      let tarjetas = repositorio.getTarjetas();
      let contenedor = repositorio.getContenedor();

      TarjetaRender.renderTarjetas(contenedor, tarjetas);
    });
  }

  static renderizarCategoria(categoria) {
    let repositorio = BlogTarjetaRepository.getInstancia();
    let tarjetas = repositorio.getTarjetasPorCategoria(categoria);
    let contenedor = repositorio.getContenedor();

    if (!tarjetas.length) {
      contenedor.replaceChildren();
      let elemento = document.createElement('p');
      elemento.classList.add('blog__sin-resultados');
      elemento.innerText = `No se encontraron resultados para la categoría "${categoria}"`;
      this.render(contenedor, elemento);
      return;
    }

    TarjetaRender.renderTarjetas(contenedor, tarjetas);
  }
}
