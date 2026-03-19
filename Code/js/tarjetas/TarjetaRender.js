import { Render } from '../Render.js';

export class TarjetaRender extends Render {
  static renderTarjetas(contenedor, tarjetas) {
    contenedor.replaceChildren();

    for (let tarjeta of tarjetas) {
      this.render(contenedor, tarjeta.getElemento());
    }
  }
}
