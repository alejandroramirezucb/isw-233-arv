export class EscalaRender {
  render() {
    const observer = new ResizeObserver(this.callback.bind(this));

    for (let elemento of document.querySelectorAll('[data-escala]')) {
      observer.observe(elemento, { box: 'border-box' });
    }
  }

  callback(entries) {
    for (let entrie of entries) {
      if (entrie.contentRect.width === 0 || entrie.target.escalaRegistrada) {
        continue;
      }

      entrie.target.escalaRegistrada = true;
      const escala = entrie.target.getAttribute('data-escala');

      entrie.target.addEventListener('mouseenter', () => {
        entrie.target.style.transform = `scale(${escala})`;
      });

      entrie.target.addEventListener('mouseleave', () => {
        entrie.target.style.transform = '';
      });
    }
  }
}
