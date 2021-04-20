/**
 * A Counter is a Map subclass for counting objects.
 * Elements are stored as keys and their counts are stored as values.
 * This is similar to Python's [collections.Counter](https://docs.python.org/3/library/collections.html).
 * 
 * ```typescript
 * const counter = new Counter(['a', 'a', 'b']);
 * counter.get('a') //=> 2
 * counter.update(['a'])
 * counter.get('a') //=> 3
 * ```
 * 
 * @typeParam T Object to be counted. Used as key in the Map.
 */
export class Counter<T> extends Map<T, number> {
  constructor(iterableOrMap?: Iterable<T> | Map<T, number>) {
    if (iterableOrMap instanceof Map) {
      super(iterableOrMap);
    } else if (iterableOrMap) {
      super();
      this.update(iterableOrMap);
    } else {
      super();
    }
  }

  get(key: T): number {
    return super.get(key) ?? 0;
  }

  update(iterableOrMap: Iterable<T> | Map<T, number>): this {
    if (iterableOrMap instanceof Map) {
      for (const [item, count] of iterableOrMap.entries()) {
        this.set(item, this.get(item) + count);
      }
    } else {
      for (const item of iterableOrMap) {
        this.set(item, this.get(item) + 1);
      }
    }
    return this;
  }

  /**
   * @returns list of `[object, count]` tuples sorted by descending count 
   */
  sorted(): [object: T, count: number][] {
    return Array.from(this.entries()).sort((a, b) => b[1] - a[1]);
  }

  /**
   * @returns sum of counts
   */
  sum(): number {
    return Array.from(this.values()).reduce((a, b) => a + b);
  }
}
