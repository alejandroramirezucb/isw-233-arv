export class EscalaRender {
  render() {
    const observer = new ResizeObserver(this.callback.bind(this));

    for (let elemento of document.querySelectorAll('[data-escala]')) {
      observer.observe(elemento, { box: 'border-box' });
    }
  }

  callback(entries: ResizeObserverEntry[]) {
    for (let entrie of entries) {
      const target = entrie.target as HTMLElement & {
        escalaRegistrada?: boolean;
      };

      if (entrie.contentRect.width === 0 || target.escalaRegistrada) {
        continue;
      }

      target.escalaRegistrada = true;
      const escala = target.getAttribute('data-escala');

      target.addEventListener('mouseenter', () => {
        target.style.transform = `scale(${escala})`;
      });

      target.addEventListener('mouseleave', () => {
        target.style.transform = '';
      });
    }
  }
}
