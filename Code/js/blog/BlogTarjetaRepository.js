import { TarjetaRepository } from '../tarjetas/TarjetaRepository.js';
import { BlogTarjetaFactory } from './BlogTarjetaFactory.js';

export class BlogTarjetaRepository extends TarjetaRepository {
  static instancia = null;
  contenedor = document.querySelector('.blog__contenedor');

  tarjetas = [
    BlogTarjetaFactory.crearTarjeta({
      fecha: '2026',
      titulo:
        'DeepSeek-V3.1 en una Quipus de 8GB: Guía práctica para freír huevos',
      descripcion:
        'Este artículo analizará el experimento termodinámico de intentar cargar un modelo de 670B en 8GB de RAM, un proceso que transforma instantáneamente el chasis de plástico en una plancha de cocina de grado profesional.',
    }),
    BlogTarjetaFactory.crearTarjeta({
      fecha: '2025',
      titulo: 'Análisis Integral de la Inteligencia Artificial en Salud',
      descripcion:
        'Esta investigación tiene como propósito fundamental examinar la implementación de la inteligencia artificial (IA) en el ámbito sanitario, tomando como eje el principio de confiabilidad (reliability) establecido por la norma ISO 24028.',
    }),
    BlogTarjetaFactory.crearTarjeta({
      fecha: '2025',
      titulo:
        'Estándar DDR5: ¿Memoria Volátil o Nueva Reserva de Valor Macroeconómica?',
      descripcion:
        'Ante la volatilidad de los mercados, este estudio propone tratar los módulos RAM no como hardware, sino como el nuevo "patrón oro" digital. Analizamos cómo la RAM ha superado a los bonos del Tesoro en estabilidad financiera, permitiendo a los ingenieros considerar sus bancos de memoria como activos de refugio.',
    }),
  ];

  static getInstancia() {
    if (!BlogTarjetaRepository.instancia) {
      BlogTarjetaRepository.instancia = new BlogTarjetaRepository();
    }

    return BlogTarjetaRepository.instancia;
  }
}
