/**
 * Iterator that repeats {item}
 */
export function* repeat<T>(item: T, times?: number): Generator<T> {
  if (typeof times === 'undefined') {
    while (true) {
      yield item;
    }
  } else {
    // TODO: Test if Array(times).fill(item) is faster
    for (let i = 0; i < times; i++) {
      yield item;
    }
  }
}