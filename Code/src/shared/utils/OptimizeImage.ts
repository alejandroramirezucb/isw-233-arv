export class OptimizeImage {
  optimize() {
    const observer = new IntersectionObserver(this.callback.bind(this), {
      threshold: 0.2,
    });

    const images = document.querySelectorAll('img[data-src]');

    images.forEach((image) => {
      observer.observe(image);
    });
  }

  callback(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target as HTMLImageElement;
      const dataSrc = target.getAttribute('data-src');

      if (!dataSrc) return;

      target.src = dataSrc;
      observer.unobserve(target);
    });
  }
}
