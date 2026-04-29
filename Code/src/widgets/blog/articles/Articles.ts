import { Block } from '@/shared/lib/Block';
import { ArticleCard } from '@/entities/article/model/ArticleCard';
import { Article } from '@/entities/article/ui/Article';
import _template from '@/widgets/blog/articles/Articles.hbs?raw';
import _noResults from '@/shared/ui/NoResults.hbs?raw';

export class Articles extends Block {
  protected template = _template;

  constructor(props: ArticleCard[]) {
    super(props);
  }

  protected willMount() {
    this.makeCards();
  }

  public makeCards() {
    const container = this.element.querySelector('.articles__container');

    if (!container) return;

    container.innerHTML = '';

    if (this.props.length === 0) {
      container.innerHTML = _noResults;
      return;
    }

    this.props.forEach((prop) => {
      const article = new Article(prop);
      container.appendChild(article.element);
    });
  }
}
