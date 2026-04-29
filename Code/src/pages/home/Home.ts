import { Block } from '@/shared/lib/Block';
import { ROUTE } from '@/app/router/Router';
import _template from '@/pages/home/Home.hbs?raw';
import { EventBus } from '@/shared/lib/EventBus';

export class Home extends Block {
  protected template = _template;

  get events() {
    return {
      'click .button': () => this.clickBoton(),
    };
  }

  private clickBoton() {
    EventBus.emit('navigate', ROUTE.CONTACT);
  }
}
