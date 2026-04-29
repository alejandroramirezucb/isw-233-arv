import type { Pages } from '@/pages/Pages';
import { EventBus } from '@/shared/lib/EventBus';

export enum ROUTE {
  HOME = '',
  ABOUT = '/sobre-mi',
  PROJECTS = '/proyectos',
  BLOG = '/blog',
  CONTACT = '/contacto',
}

export class Router {
  private static pages: Pages;
  private static app: HTMLElement;

  static init(pages: Pages, app: HTMLElement) {
    Router.pages = pages;
    Router.app = app;
    Router.makeBack();
    Router.makeNav();
    Router.navigate(ROUTE.HOME);
  }

  static navigate(route: ROUTE) {
    const name = Object.entries(ROUTE).find(
      ([, _route]) => route === _route,
    )[0];

    if (!name) return;

    Router.app.replaceChildren(Router.pages[name].element);
    history.pushState({}, '', route);
  }

  private static makeBack() {
    window.addEventListener('popstate', () => {
      Router.navigate(window.location.pathname as ROUTE);
    });
  }

  private static makeNav() {
    EventBus.on('navigate', (route: ROUTE) => Router.navigate(route));
  }
}
