export type Handler<T = unknown> = (event: T) => void;

export const createEventBus = () => {
  const map = new Map<string, Set<Handler>>();
  return {
    on(type: string, fn: Handler) {
      if (!map.has(type)) map.set(type, new Set());
      map.get(type)!.add(fn);
    },
    off(type: string, fn: Handler) {
      map.get(type)?.delete(fn);
    },
    emit<T>(type: string, event: T) {
      map.get(type)?.forEach(fn => fn(event));
    }
  };
};

