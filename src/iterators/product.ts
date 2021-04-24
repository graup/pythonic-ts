type Iterableify<T> = { [K in keyof T]: Iterable<T[K]> }

/**
 * Cartesian product of input iterables.
 * Roughly equivalent to nested for-loops in a generator expression.
 * 
 * ```typescript
 * const z = product([1, 2, 3], [true, false]);
 * Array.from(z)  //=> [[1, true], [2, true], [3, true], [1, false], [2, false], [3, false]]
 * ```
 * 
 * Source: based on https://gist.github.com/cybercase/db7dde901d7070c98c48#gistcomment-3033459
 */
export function* product<T extends Array<unknown>>(...iterables: Iterableify<T>): Generator<T> {
  if (iterables.length === 0) { return; }
  const iterators = iterables.map(it => it[Symbol.iterator]());
  const results = iterators.map(it => it.next());
  
  // Cycle through iterators
  for (let i = 0;;) {
    if (results[i].done) {
      // Reset the current iterator
      iterators[i] = iterables[i][Symbol.iterator]();
      results[i] = iterators[i].next();
      // Advance and exit if we've reached the end
      if (++i >= iterators.length) { return; }
    } else {
      yield results.map(({ value }) => value) as T;
      i = 0;
    }
    results[i] = iterators[i].next();
  }
}
