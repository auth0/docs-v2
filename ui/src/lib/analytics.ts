// Type declaration only. The window.heap object is injected at runtime by
// Mintlify's Heap integration (configured in docs.json); this interface tells
// TypeScript its shape so callers like feedback.ts can use window.heap.track().
interface Heap {
  track: (event: string, properties?: object) => void;
  identify: (identity: string) => void;
  resetIdentity: () => void;
  addUserProperties: (properties: object) => void;
  addEventProperties: (properties: object) => void;
  removeEventProperty: (property: string) => void;
  clearEventProperties: () => void;
  appid: string;
  userId: string;
  identity: string | null;
  config: unknown;
}

declare global {
  interface Window {
    heap: Heap;
  }
}
