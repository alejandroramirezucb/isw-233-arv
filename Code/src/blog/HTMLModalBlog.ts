import { HTMLComponenteBase } from '../base/HTMLComponenteBase.js';

export class HTMLModalBlog extends HTMLComponenteBase {
  connectedCallback() {
    this.agregarClases('modal-blog');
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');
    this.setAttribute('aria-label', 'Modal de Blog');
  }
}

customElements.define('modal-blog', HTMLModalBlog);
