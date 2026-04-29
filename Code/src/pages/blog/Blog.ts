import { Block } from '@/shared/lib/Block';
import { ArticleCard } from '@/entities/article/model/ArticleCard';
import { Articles } from '@/widgets/blog/articles/Articles';
import _template from '@/pages/blog/Blog.hbs?raw';
import { EventBus } from '@/shared/lib/EventBus';

export type Categories = Record<Category, ArticleCard[]>;

export enum Category {
  ALL = 'Todos',
  TECH = 'Tecnología',
  AI = 'Inteligencia Artificial',
  FAVORITES = 'Favoritos',
}

export class Blog extends Block {
  private articles: Articles;
  private categories: Categories;
  protected template = _template;

  constructor(props: ArticleCard[]) {
    super(props);
    this.articles = new Articles(props);
  }

  get children() {
    return {
      articles: this.articles,
    };
  }

  get events() {
    return {
      'click .blog__add-button': () => EventBus.emit('open::modal'),
      'click .blog__category-button': (event: Event) =>
        this.clickCategory(event),
    };
  }

  protected willMount() {
    this.makeCategories();

    EventBus.on('add::article', (article: ArticleCard) => {
      this.addArticle(article);
    });
  }

  private addArticle(article: ArticleCard) {
    this.props.push(article);
    this.makeCategories();
  }

  private clickCategory(event: Event) {
    let button = event.target as HTMLButtonElement;

    if (!button.dataset.category) {
      button = (event.target as HTMLElement).closest(
        '.blog__category-button',
      ) as HTMLButtonElement;
    }

    const category = button?.dataset.category;

    if (category) {
      this.makeCategories();
      this.articles.props = this.categories[category];
      this.articles.makeCards();
    }
  }

  private makeCategories() {
    this.categories = {
      [Category.ALL]: this.props,
      [Category.TECH]: this.filterByCategory(Category.TECH),
      [Category.AI]: this.filterByCategory(Category.AI),
      [Category.FAVORITES]: this.filterByFavorites(),
    };
  }

  private filterByCategory(category: Category) {
    return this.props.filter((article) => article.category === category);
  }

  private filterByFavorites() {
    return this.props.filter((article) => article.isFavorite);
  }
}
