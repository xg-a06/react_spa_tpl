const eventMap = Symbol('eventMap');

class EventEmitter {
  constructor() {
    this[eventMap] = new Map();
  }

  on(eventNames, fn) {
    let events = [eventNames];
    if (Array.isArray(eventNames)) {
      events = eventNames;
    }
    events.forEach((eventName) => {
      if (this[eventMap].has(eventName)) {
        this[eventMap].get(eventName).push(fn);
      } else {
        this[eventMap].set(eventName, [fn]);
      }
    });
    return this;
  }

  off(eventName, fn) {
    if (eventName === undefined) {
      this[eventMap].clear();
    } else if (this[eventMap].has(eventName)) {
      if (fn === undefined) {
        this[eventMap].delete(eventName);
      } else {
        const fns = this[eventMap].get(eventName);
        const index = fns.indexOf(fn);
        if (index !== -1) {
          fns.splice(index, 1);
        }
      }
    }
    return this;
  }

  once(eventName, fn) {
    this.on(eventName, (...args) => {
      this.off(eventName, fn);
      fn.apply(this, args);
    });
    return this;
  }

  emit(eventName, ...args) {
    if (this[eventMap].has(eventName)) {
      this[eventMap].get(eventName).forEach((fn) => {
        fn.apply(this, args);
      });
      return true;
    }
    return false;
  }
}

export default new EventEmitter();
