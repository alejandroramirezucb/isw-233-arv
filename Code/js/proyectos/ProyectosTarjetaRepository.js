import { TarjetaRepository } from '../TarjetaRepository.js';
import { ProyectosTarjetaFactory } from './ProyectosTarjetaFactory.js';

export class ProyectosTarjetaRepository extends TarjetaRepository {
  static instancia = null;
  contenedor = document.querySelector('.proyectos__contenedor');
  
  tarjetas = [
    ProyectosTarjetaFactory.crearTarjeta({
      fecha: '2025',
      titulo: 'UCB Hold',
      descripcion:
        'Web de gestión de inventario y préstamos para los laboratorios de Mecatrónica (UCB). Sustituye los registros manuales por una plataforma que permite gestionar eficientemente y sin errores de papel.',
      imagenUrl: 'images/proyecto-ucb-hold.png',
    }),
    ProyectosTarjetaFactory.crearTarjeta({
      fecha: '2025',
      titulo: 'Simulador de Arquitectura x86',
      descripcion:
        'Simulador de un procesador x86. Permite visualizar la ejecución de instrucciones, el manejo de registros y el flujo de memoria, facilitando el aprendizaje práctico de la arquitectura de computadores.',
      imagenUrl: 'images/proyecto-simulador-arquitectura-x86.png',
    }),
    ProyectosTarjetaFactory.crearTarjeta({
      fecha: '2024-2025',
      titulo: 'Pasa App',
      descripcion:
        'Aplicación diseñada para la administración y reserva de asientos en buses. Soluciona la logística de transporte mediante una interfaz que centraliza la gestión de pasajes y rutas.',
      imagenUrl: 'images/proyecto-pasa.png',
    }),
  ];

  
  static getInstancia() {
    if (!ProyectosTarjetaRepository.instancia) {
      ProyectosTarjetaRepository.instancia = new ProyectosTarjetaRepository();
    }

    return ProyectosTarjetaRepository.instancia;
  }

}
