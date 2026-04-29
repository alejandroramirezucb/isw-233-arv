import { Block } from '@/shared/lib/Block';
import { EventBus } from '@/shared/lib/EventBus';
import _template from '@/widgets/navbar/Navbar.hbs?raw';

export class Navbar extends Block {
  protected template = _template;

  get events() {
    return {
      'click .navbar__link': (event: Event) => this.navigate(event),
    };
  }

  private navigate(event: Event) {
    event.preventDefault();

    const link = event.target as HTMLAnchorElement;
    const route = link.dataset.route;

    EventBus.emit('navigate', route);
  }
}
