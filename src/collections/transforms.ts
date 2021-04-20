/**
 * Creates a Map composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 * 
 * To convert to an object, use `Object.fromEntries(keyBy(...))`.
 *
 * ```typescript
 * const array = [
 *   { 'id': '1', 'code': 97 },
 *   { 'id': '2', 'code': 100 }
 * ]
 * keyBy(array, ({ id }) => id)
 * // => [['1', { 'id': '1', 'code': 97 }], ['2', { 'id': '2', 'code': 100 }]
 * ```
 * 
 * @typeParam T collection item
 * @typeParam K group by key
 */
export function keyBy<T, K>(collection: readonly T[], iteratee: (obj: T) => K): Map<K, T> {
  return collection.reduce((acc, obj) => {
    acc.set(iteratee(obj), obj);
    return acc;
  }, new Map<K, T>());
}

/**
 * Creates a Map composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value of
 * each key is a list of all elements responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 * 
 * To convert the result to an object, use `Object.fromEntries(groupBy(...))`.
 *
 * ```typescript
 * const array = [6.1, 4.2, 6.3];
 * groupBy(array, Math.floor)
 * // => [6, [6.1, 6.3]], [4, [4.2]]
 * ```
 * 
 * @typeParam T collection item
 * @typeParam K group by key
 */
export function groupBy<T, K>(collection: readonly T[], iteratee: (obj: T) => K): Map<K, T[]> {
  return collection.reduce((acc, obj) => {
    const key = iteratee(obj);
    acc.get(key)?.push(obj) ?? acc.set(key, [obj]);
    return acc;
  }, new Map<K, T[]>());
}