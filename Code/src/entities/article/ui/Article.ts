import { Block } from '@/shared/lib/Block';
import { ArticleCard } from '@/entities/article/model/ArticleCard';
import { EventBus } from '@/shared/lib/EventBus';
import _template from '@/entities/article/ui/Article.hbs?raw';

export class Article extends Block {
  protected template = _template;

  constructor(props: ArticleCard) {
    super(props);
  }

  get events() {
    return {
      'click .blog__like-button': (event) => this.clickLike(event),
    };
  }

  private clickLike(event: Event) {
    this.props.isFavorite = !this.props.isFavorite;
  }
}
