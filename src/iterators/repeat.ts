/**
 * Iterator that repeats `item` `times` number of times.
 * When `times` is undefined, repeats indefinitely.
 */
export function* repeat<T>(item: T, times?: number): Generator<T> {
  if (typeof times === 'undefined') {
    while (true) {
      yield item;
    }
  } else {
    // TODO: Benchmark if Array(times).fill(item) is faster
    for (let i = 0; i < times; i++) {
      yield item;
    }
  }
}