export class ImagenRender {
  render() {
    const observer = new IntersectionObserver(this.callback.bind(this), {
      threshold: 0.2,
    });

    let imagenes = document.querySelectorAll('img[data-src]');

    for (let imagen of imagenes) {
      observer.observe(imagen);
    }
  }

  callback(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) {
    for (let entrie of entries) {
      if (entrie.isIntersecting) {
        const target = entrie.target as HTMLImageElement;
        target.src = String(target.getAttribute('data-src'));
        observer.unobserve(target);
      }
    }
  }
}
