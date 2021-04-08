export function* mapIterator<T, T2>(iterator: IterableIterator<T>, callbackFn: (val: T, idx: number) => T2): IterableIterator<T2> {
  let idx = 0;
  for (const val of iterator) {
    yield callbackFn(val, idx++);
  }
}
