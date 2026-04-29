type Callback = (...props: any[]) => void;

export class EventBus {
  private static listeners: Record<string, Callback[]> = {};

  static on(name: string, callback: Callback) {
    if (!EventBus.listeners[name]) EventBus.listeners[name] = [];

    EventBus.listeners[name].push(callback);
  }

  static off(name: string, callback: Callback) {
    if (EventBus.listeners[name])
      EventBus.listeners[name] = EventBus.listeners[name].filter(
        (_callback) => _callback !== callback,
      );
  }

  static emit(name: string, ...props: any[]) {
    if (EventBus.listeners[name])
      EventBus.listeners[name].forEach((callback) => callback(...props));
  }
}
