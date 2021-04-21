/**
 * Create an object which calls a factory function when a non-existing key is accessed.
 */
export function defaultdict<T, K extends string = string>(factory: () => T): Record<K, T> {
  const obj = {} as Record<K, T>;
  return new Proxy(obj, {
    get(obj, prop: K) {
      if (!(prop in obj)) obj[prop] = factory();
      return obj[prop];
    },
  });
}