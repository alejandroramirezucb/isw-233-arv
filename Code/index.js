import { BlogTarjetaRepository } from './js/blog/BlogTarjetaRepository.js';
import { ProyectosTarjetaRepository } from './js/proyectos/ProyectosTarjetaRepository.js';
import { TarjetaRender } from './js/tarjetas/TarjetaRender.js';

document.addEventListener('DOMContentLoaded', () => {
  let repositorioProyectos = ProyectosTarjetaRepository.getInstancia();
  let repositorioBlog = BlogTarjetaRepository.getInstancia();
  let tarjetasProyectos = repositorioProyectos.getTarjetas();
  let tarjetasBlog = repositorioBlog.getTarjetas();
  let contenedorProyectos = repositorioProyectos.getContenedor();
  let contenedorBlog = repositorioBlog.getContenedor();

  TarjetaRender.renderTarjetas(contenedorProyectos, tarjetasProyectos);
  TarjetaRender.renderTarjetas(contenedorBlog, tarjetasBlog);
});
