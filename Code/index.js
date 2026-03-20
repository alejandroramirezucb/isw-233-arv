import { BlogTarjetaRepository } from './js/blog/BlogTarjetaRepository.js';
import { ProyectosTarjetaRepository } from './js/proyectos/ProyectosTarjetaRepository.js';
import { TarjetaRender } from './js/tarjetas/TarjetaRender.js';

function renderTarjetasRepositorios() {
  let repositorioBlog = BlogTarjetaRepository.getInstancia();
  let repositorioProyectos = ProyectosTarjetaRepository.getInstancia();

  TarjetaRender.renderTarjetasRepositorio(repositorioBlog);
  TarjetaRender.renderTarjetasRepositorio(repositorioProyectos);
}

renderTarjetasRepositorios();

