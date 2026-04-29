import { Block } from '@/shared/lib/Block';
import { EventBus } from '@/shared/lib/EventBus';
import { ArticleCard } from '@/entities/article/model/ArticleCard';
import _template from '@/widgets/blog/modal/Modal.hbs?raw';

export class Modal extends Block {
  protected template = _template;
  private app: HTMLElement;
  private overlay: HTMLElement;

  constructor(app: HTMLElement) {
    super();
    this.app = app;
  }

  get events() {
    return {
      'click .blog-modal__close-button': () => this.closeModal(),
      'submit .blog-modal__form': (event: Event) => this.makeArticle(event),
    };
  }

  protected willMount() {
    EventBus.on('open::modal', () => this.openModal());
  }

  private openModal() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'blog-modal-overlay';
    this.app.appendChild(this.overlay);
    this.app.appendChild(this.element);
  }

  private closeModal() {
    if (this.overlay) this.overlay.remove();
    this.element.remove();
  }

  private makeArticle(event: Event) {
    event.preventDefault();

    const modalForm = event.target as HTMLFormElement;
    const form = new FormData(modalForm);

    const article: ArticleCard = {
      title: form.get('title') as string,
      description: form.get('description') as string,
      category: form.get('category') as string,
      date: new Date().getFullYear(),
      like: false,
      isFavorite: false,
    };

    EventBus.emit('add::article', article);
    this.closeModal();
  }
}
