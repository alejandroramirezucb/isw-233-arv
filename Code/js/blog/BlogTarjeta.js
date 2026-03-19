import { Tarjeta } from '../Tarjeta.js';

export class BlogTarjeta extends Tarjeta {
  constructor(config) {
    super(config);
    this.esFavorito = false;
    this.name = 'blog';
  }

  getEsFavorito() {
    return this.esFavorito;
  }

  marcarComoFavorito() {
    this.esFavorito = true;
  }
}
