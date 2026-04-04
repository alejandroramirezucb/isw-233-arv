import { ListaTarjetas } from '../tarjetas/ListaTarjetas.js';
import { FactoryBlogTarjeta } from './FactoryBlogTarjeta.js';
import { ItemBlogTarjeta } from './ItemBlogTarjeta.js';

export class ListaBlogTarjetas extends ListaTarjetas {
  tarjetas: ItemBlogTarjeta[] = [];

  async cargarTarjetas() {
    const data = await fetch('data/blog.json');
    const tarjetasJson = await data.json();

    for (let tarjeta of tarjetasJson) {
      super.agregarTarjeta(FactoryBlogTarjeta.crearTarjeta(tarjeta));
    }
  }

  getTarjetasPorCategoria(categoria) {
    if (categoria === 'Todos') {
      return this.getTarjetas();
    }

    if (categoria === 'Favoritos') {
      return this.tarjetas.filter((tarjeta) => tarjeta.getEsFavorito());
    }

    return this.tarjetas.filter(
      (tarjeta) => tarjeta.getCategoria() === categoria,
    );
  }

  agregarTarjeta(options) {
    super.agregarTarjeta(options.tarjeta);
    if (
      options.contenedor &&
      options.categoriaActiva &&
      (options.categoriaActiva === options.tarjeta.getCategoria() ||
        options.categoriaActiva === 'Todos')
    ) {
      options.contenedor.appendChild(options.tarjeta.getElemento());
    }
  }
}
