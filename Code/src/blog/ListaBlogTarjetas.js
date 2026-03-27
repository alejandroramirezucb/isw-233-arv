import { ListaTarjetas } from '../tarjetas/ListaTarjetas.js';
import { FactoryBlogTarjeta } from './FactoryBlogTarjeta.js';

export class ListaBlogTarjetas extends ListaTarjetas {
  tarjetas = [
    FactoryBlogTarjeta.crearTarjeta({
      fecha: '2026',
      titulo:
        'DeepSeek-V3.1 en una Quipus de 8GB: Guía práctica para freír huevos',
      categoria: 'Tecnología',
      descripcion:
        'Este artículo analizará el experimento termodinámico de intentar cargar un modelo de 670B en 8GB de RAM, un proceso que transforma instantáneamente el chasis de plástico en una plancha de cocina de grado profesional.',
    }),
    FactoryBlogTarjeta.crearTarjeta({
      fecha: '2025',
      titulo: 'Análisis Integral de la Inteligencia Artificial en Salud',
      categoria: 'Inteligencia Artificial',
      descripcion:
        'Esta investigación tiene como propósito fundamental examinar la implementación de la inteligencia artificial (IA) en el ámbito sanitario, tomando como eje el principio de confiabilidad (reliability) establecido por la norma ISO 24028.',
    }),
    FactoryBlogTarjeta.crearTarjeta({
      fecha: '2025',
      titulo:
        'Estándar DDR5: ¿Memoria Volátil o Nueva Reserva de Valor Macroeconómica?',
      categoria: 'Tecnología',
      descripcion:
        'Ante la volatilidad de los mercados, este estudio propone tratar los módulos RAM no como hardware, sino como el nuevo "patrón oro" digital. Analizamos cómo la RAM ha superado a los bonos del Tesoro en estabilidad financiera, permitiendo a los ingenieros considerar sus bancos de memoria como activos de refugio.',
    }),
  ];

  getTarjetasPorCategoria(categoria) {
    if (categoria === 'Todos') {
      return this.getTarjetas();
    }

    if (categoria === 'Favoritos') {
      return this.tarjetas.filter((tarjeta) => tarjeta.getEsFavorito());
    }

    return this.tarjetas.filter((tarjeta) => tarjeta.getCategoria() === categoria);
  }
}
