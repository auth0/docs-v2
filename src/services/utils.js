// State constants
const State = {
  NotLoaded: "not_loaded",
  Loading: "loading",
  Loaded: "loaded",
  Failed: "failed",
  Timeout: "timeout",
};

// ServiceId constants
const ServiceId = {
  Heap: "heap",
  Optimizely: "optimizely",
  Pendo: "pendo",
  Qualtrics: "qualtrics",
  Usabilla: "usabilla",
};
const ANALYTICS_EVENTS = "ANALYTICS_EVENTS";

function awaitForAnalyticsChange(serviceId) {
  return new Promise((resolve, reject) => {
    function OnEventChange(customEvent) {
      const { id, eventState } = customEvent.detail;
      if (id === serviceId || eventState === State.Timeout) {
        resolve(eventState);
        window.removeEventListener(ANALYTICS_EVENTS, OnEventChange);
      }
    }
    window.addEventListener(ANALYTICS_EVENTS, OnEventChange);
  });
}

class DeferredQueue {
  constructor() {
    this.ready = false;
    this.queue = [];
  }

  add(callback) {
    if (this.ready) {
      callback();
    } else {
      this.queue && this.queue.push(callback);
    }
  }

  run() {
    this.ready = true;
    this.queue && this.queue.forEach((callback) => {
      callback();
    });
    // no need for a queue anymore, new calls will just run
    this.queue = null;
  }

  clear() {
    // after the queue is cleared newly added calls will not run and be lost
    this.queue = null;
  }
}

// Export for use in other files (CommonJS style, or adapt for your module system)
export {
  State,
  ServiceId,
  ANALYTICS_EVENTS,
  awaitForAnalyticsChange,
  DeferredQueue,
};