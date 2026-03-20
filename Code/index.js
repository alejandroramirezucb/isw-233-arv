import './js/tarjetas/TarjetaElement.js';
import { BlogTarjetaRepository } from './js/blog/BlogTarjetaRepository.js';
import { ProyectosTarjetaRepository } from './js/proyectos/ProyectosTarjetaRepository.js';
import { TarjetaRender } from './js/tarjetas/TarjetaRender.js';

window.renderizarCategoria =
  TarjetaRender.renderizarCategoria.bind(TarjetaRender);

function renderTarjetasRepositorios() {
  let repositorioBlog = BlogTarjetaRepository.getInstancia();
  let repositorioProyectos = ProyectosTarjetaRepository.getInstancia();

  TarjetaRender.renderTarjetasRepositorio(repositorioBlog);
  TarjetaRender.renderTarjetasRepositorio(repositorioProyectos);
}

renderTarjetasRepositorios();
