export type Updater<S> = Partial<S> | ((s: S) => Partial<S>);
export interface StoreApi<S> {
  getState(): S;
  setState(u: Updater<S>): void;
  subscribe(fn: (s: S) => void): () => void;
}

export const createStore = <S>(init: (set: StoreApi<S>["setState"], get: StoreApi<S>["getState"]) => S): StoreApi<S> => {
  let state!: S;
  const listeners = new Set<(s: S) => void>();
  const getState = () => state;
  const setState: StoreApi<S>["setState"] = (u) => {
    const next = typeof u === "function" ? (u as (s: S) => Partial<S>)(state) : u;
    state = { ...state, ...next };
    listeners.forEach(l => l(state));
  };
  const subscribe: StoreApi<S>["subscribe"] = (fn) => (listeners.add(fn), () => listeners.delete(fn));
  state = init(setState, getState);
  return { getState, setState, subscribe };
};

