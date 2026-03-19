import { BlogTarjetaRepository } from './js/blog/BlogTarjetaRepository.js';
import { ProyectosTarjetaRepository } from './js/proyectos/ProyectosTarjetaRepository.js';

document.addEventListener('DOMContentLoaded', () => {
  let repositorioProyectos = ProyectosTarjetaRepository.getInstancia();
  let repositorioBlog = BlogTarjetaRepository.getInstancia();

  repositorioProyectos.renderTarjetas();
  repositorioBlog.renderTarjetas();
});
