import { take } from './take';

/**
 * A lazy iterator that evaluates the given generator only as far as needed
 * and caches the results to return an item at index
 */
export function lazyItemGetter<T>(generator: Generator<T>): (index: number) => T {
  const items: T[] = [];
  
  function takeUntil(index: number) {
    if (items.length > index) return;
    items.push(...take(generator, index + 1 - items.length));
    if (items.length < index + 1) {
      throw new Error(`generator exhausted before reaching index ${index}`);
    }
  }

  return function getItem(index: number): T {
    takeUntil(index);
    return items[index];
  }
}