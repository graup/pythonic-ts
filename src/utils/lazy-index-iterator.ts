/**
 * A lazy iterator that evaluates the given generator only as far as needed
 * and caches the results
 * @param generator 
 */
export function lazyIndexIterator<T>(generator: Generator<T>): (index: number) => T {
  let evaluatedUntil = -1;
  const items: T[] = [];
  
  function takeUntil(index: number) {
    while (evaluatedUntil < index) {
      const next = generator.next();
      if (next.done) {
        throw new Error(`generator exhausted before reaching index ${index}`);
      }
      items.push(next.value);
      evaluatedUntil++;
    }
  }

  return function(index: number): T {
    takeUntil(index);
    return items[index];
  }
}