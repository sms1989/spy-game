declare global {
  interface Window {
    storage: {
      [key: string]: unknown;
    };
    tabID: string;
  }
}

const LAST_TAB_ID = "lastTabID";
const CHANEL_NAME = "syncStorage";

export enum StoreMode {
  LOCAL = "local",
  SESSION = "session",
  TEMP = "temp",
}

if (!window.storage) {
  window.storage = {};
}

export default class Store {
  constructor(private mode: StoreMode) {
    return new Proxy(this, this.proxyHandler());
  }

  static init() {
    window.tabID = Math.random().toString(36).substring(2);
    localStorage.setItem(LAST_TAB_ID, window.tabID);
    const channel = new BroadcastChannel(CHANEL_NAME);
    channel.onmessage = function (event) {
      for (const key in event.data) {
        sessionStorage.setItem(key, event.data[key]);
      }
    };

    window.addEventListener("storage", function (event) {
      if (event.key === LAST_TAB_ID) {
        if (event.newValue !== window.tabID) {
          const data = {} as { [key: string]: unknown };
          for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) {
              data[key] = sessionStorage.getItem(key);
            }
          }
          channel.postMessage(data);
        }
      }
    });
  }

  static get local() {
    return new Store(StoreMode.LOCAL);
  }

  static get session() {
    return new Store(StoreMode.SESSION);
  }

  static get temp() {
    return new Store(StoreMode.TEMP);
  }

  // Add an index signature to allow dynamic property access
  [key: string]: any;

  set(key: string, value: unknown) {
    const str = JSON.stringify(value);
    switch (this.mode) {
      case StoreMode.LOCAL:
        localStorage.setItem(key, str);
        break;
      case StoreMode.SESSION:
        sessionStorage.setItem(key, str);
        break;
      case StoreMode.TEMP:
        window.storage[key] = value;
        break;
    }
  }

  get<T = unknown>(key: string, defaultValue?: T): T | undefined {
    let value;
    switch (this.mode) {
      case StoreMode.LOCAL:
        value = localStorage.getItem(key);
        break;
      case StoreMode.SESSION:
        value = sessionStorage.getItem(key);
        break;
      case StoreMode.TEMP:
        value = window.storage[key];
        break;
    }
    if (value && typeof value === "string") return JSON.parse(value);
    return defaultValue;
  }

  remove(key: string) {
    switch (this.mode) {
      case StoreMode.LOCAL:
        localStorage.removeItem(key);
        break;
      case StoreMode.SESSION:
        sessionStorage.removeItem(key);
        break;
      case StoreMode.TEMP:
        delete window.storage[key];
        break;
    }
  }

  clear() {
    switch (this.mode) {
      case StoreMode.LOCAL:
        localStorage.clear();
        break;
      case StoreMode.SESSION:
        sessionStorage.clear();
        break;
      case StoreMode.TEMP:
        window.storage = {};
        break;
    }
  }

  getAll() {
    switch (this.mode) {
      case StoreMode.LOCAL:
        return Object.keys(localStorage).reduce((acc, key) => {
          acc[key] = JSON.parse(localStorage.getItem(key) as string);
          return acc;
        }, {} as { [key: string]: unknown });
      case StoreMode.SESSION:
        return Object.keys(sessionStorage).reduce((acc, key) => {
          acc[key] = JSON.parse(sessionStorage.getItem(key) as string);
          return acc;
        }, {} as { [key: string]: unknown });
      case StoreMode.TEMP:
        return window.storage;
    }
  }

  private proxyHandler() {
    return {
      get: (target: Store, property: string) => {
        // Intercept property access
        if (property in target) {
          return (target as any)[property];
        }
        return target.get(property);
      },
      set: (target: Store, property: string, value: unknown) => {
        // Intercept property assignment
        target.set(property, value);
        return true;
      },
      deleteProperty: (target: Store, property: string) => {
        // Intercept property deletion
        target.remove(property);
        return true;
      },
    };
  }
}
