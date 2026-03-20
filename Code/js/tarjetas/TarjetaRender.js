import { Render } from '../Render.js';

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
}
