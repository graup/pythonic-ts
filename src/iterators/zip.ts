type Iterableify<T> = { [K in keyof T]: Iterable<T[K]> }

/**
 * Make an iterator that aggregates elements from each of the iterables.
 * Source: https://dev.to/chrismilson/zip-iterator-in-typescript-ldm
 * @param toZip 
 */
export function* zip<T extends Array<unknown>>(...toZip: Iterableify<T>): Generator<T> {
  const iterators = toZip.map(i => i[Symbol.iterator]());

  while (true) {
    const results = iterators.map(i => i.next());
    if (results.some(({ done }) => done)) {
        break;
    }
    yield results.map(({ value }) => value) as T;
  }
}