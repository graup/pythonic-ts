export function* mapIterator<T, T2>(iterator: Iterable<T>, callbackFn: (val: T, idx: number) => T2): Iterable<T2> {
  let idx = 0;
  for (const val of iterator) {
    yield callbackFn(val, idx++);
  }
}
