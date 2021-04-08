/**
 * Takes {n} items from iterator by calling next() n times and returns
 * array of items. Stops iterating when iterator is exhausted.
 */
export function take<T>(generator: IterableIterator<T>, n: number): T[] {
  const results: T[] = [];
  for (let i = 0; i < n; i++) {
    const next = generator.next();
    if (next.done) {
      break;
    }
    results.push(next.value);
  }
  return results;
}