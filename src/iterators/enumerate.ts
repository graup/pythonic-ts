import { mapIterator } from "./map";

/**
 * Enumerate an iterable.
 * In the case of arrays, `enumerate(array)` is equivalent to `array.entries()`.
 * @returns iterator of [index, item] tuples
 */
export function enumerate<T>(iterator: T[] | IterableIterator<T>): IterableIterator<[number, T]> {
  if (Array.isArray(iterator)) {
    return iterator.entries();
  }
  return mapIterator(iterator, (item, idx) => [idx, item]);
}