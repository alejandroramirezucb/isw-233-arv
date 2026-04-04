import { ListaTarjetas } from '../tarjetas/ListaTarjetas.js';
import { FactoryProyectosTarjeta } from './FactoryProyectosTarjeta.js';
import { ItemProyectosTarjeta } from './ItemProyectosTarjeta.js';

export class ListaProyectosTarjetas extends ListaTarjetas {
  tarjetas : ItemProyectosTarjeta[] = [];

  async cargarTarjetas() {
    const data = await fetch('data/proyectos.json');
    const tarjetasJson = await data.json();

    for (let tarjeta of tarjetasJson) {
      this.agregarTarjeta(FactoryProyectosTarjeta.crearTarjeta(tarjeta));
    }
  }
}
