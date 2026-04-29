import Handlebars from 'handlebars';

export abstract class Block {
  private _props: any;
  private _dom: HTMLElement = null;
  protected abstract template: string;

  constructor(props: any = {}) {
    this.props = this.makeProps(props);
    Promise.resolve().then(() => {
      this.didMount();
      this.makeElement();
      this.willMount();
    });
  }

  protected willMount() {}
  protected didMount() {}

  private makeProps(newProps: any) {
    const block = this;
    return new Proxy(newProps, {
      set(target, prop, value) {
        target[prop] = value;
        block.makeElement();
        return true;
      },
    });
  }

  protected makeElement() {
    const template = document.createElement('template');
    template.innerHTML = Handlebars.compile(this.template)(this.props);

    const fragment = template.content.cloneNode(true).firstChild as HTMLElement;

    if (this._dom) this._dom.replaceWith(fragment);

    this._dom = fragment;

    this.makeChildren();
    this.clearEvents();
    this.makeEvents();
  }

  private makeEvents() {
    if (!this._dom) return;

    for (const [name, callback] of Object.entries(this.events)) {
      const [event, selector] = name.split(' ');

      if (!selector) {
        this._dom.addEventListener(event, callback);
        continue;
      }

      const children = this._dom.querySelectorAll(selector);
      children.forEach((child) => child.addEventListener(event, callback));
    }
  }

  private clearEvents() {
    if (!this._dom) return;

    for (const [name, callback] of Object.entries(this.events)) {
      const [event, selector] = name.split(' ');

      if (!selector) {
        this._dom.removeEventListener(event, callback);
        continue;
      }

      const children = this._dom.querySelectorAll(selector);
      children.forEach((child) => child.removeEventListener(event, callback));
    }
  }

  private makeChildren() {
    if (!this._dom) return;

    for (const [name, child] of Object.entries(this.children)) {
      const slot = this._dom.querySelector(`[child="${name}"]`);

      if (slot) slot.replaceWith(child.element);
    }
  }

  get element(): HTMLElement {
    if (!this._dom) this.makeElement();

    return this._dom;
  }

  set props(newProps: any) {
    this._props = newProps;
  }

  get props(): any {
    return this._props;
  }

  get children(): Record<string, Block> {
    return {};
  }

  get events(): Record<string, EventListener> {
    return {};
  }
}
