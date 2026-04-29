export class ScaleElements {
  scale() {
    const observer = new ResizeObserver(this.callback.bind(this));
    const elements = document.querySelectorAll<HTMLElement>('[data-scale]');

    elements.forEach((element) => {
      observer.observe(element, { box: 'border-box' });
    });
  }

  callback(entries: ResizeObserverEntry[]) {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;

      if (entry.contentRect.width === 0) return;
      if (target.dataset.scaled === 'true') return;

      target.dataset.scaled = 'true';

      target.addEventListener('mouseenter', () => {
        const scale = target.getAttribute('data-scale');

        if (!scale) return;

        target.style.transform = `scale(${scale})`;
      });

      target.addEventListener('mouseleave', () => {
        target.style.transform = '';
      });
    });
  }
}
