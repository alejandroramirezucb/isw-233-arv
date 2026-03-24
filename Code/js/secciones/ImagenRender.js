import { Render } from "../Render"

export class ImagenRender extends Render {
    static renderizarImagenes() {
        let imagenes = document.querySelectorAll('img[data-src]');
        let observer = new IntersectionObserver(this.cargarImagen, { threshold: 0.2 });

        for (let imagen of imagenes) {
            observer.observe(imagen);
        }
    }

    static cargarImagen(entries, observer) {
        for (let entry of entries) {
            if (!entry.isIntersecting) 
                continue;

            const imagen = entry.target;
            imagen.src = imagen.getAttribute('data-src');
            imagen.removeAttribute('data-src');
            observer.unobserve(imagen);
        }
    }
}