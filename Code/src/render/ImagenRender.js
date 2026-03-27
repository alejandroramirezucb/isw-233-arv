export class ImagenRender {
  render() {
    const observer = new IntersectionObserver(this.callback.bind(this), {
      threshold: 0.2,
    });
    
    let imagenes = document.querySelectorAll('.img[data-src]');

    for (let imagen of imagenes) {
      observer.observe(imagen);
    }
  }

  callback(entries, observer) {
    for (let entrie of entries) {
      if (entrie.isIntersecting) {
        entrie.target.src = entrie.target.getAttribute('data-src');
        observer.unobserve(entrie.target);
      }
    }
  }
}
