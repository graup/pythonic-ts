/**
 * Creates a Map composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 * To convert to an object, use `Object.fromEntries(keyBy(...))`.
 *
 * const array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ]
 *
 * keyBy(array, ({ code }) => String.fromCharCode(code))
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 */
export function keyBy<T, K>(collection: readonly T[], iteratee: (obj: T) => K): Map<K, T> {
  return collection.reduce((acc, obj) => {
    acc.set(iteratee(obj), obj);
    return acc;
  }, new Map<K, T>());
}

/**
 * Creates a Map composed of keys generated from the results of running
 * each element of `collection` thru `iteratee`. The corresponding value of
 * each key is a list of all elements responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 * To convert to an object, use `Object.fromEntries(keyBy(...))`.
 *
 * const array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ]
 *
 * keyBy(array, ({ code }) => String.fromCharCode(code))
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 */
export function groupBy<T, K>(collection: readonly T[], iteratee: (obj: T) => K): Map<K, T[]> {
  return collection.reduce((acc, obj) => {
    const key = iteratee(obj);
    acc.get(key)?.push(obj) ?? acc.set(key, [obj]);
    return acc;
  }, new Map<K, T[]>());
}