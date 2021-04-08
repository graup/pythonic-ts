/**
 * A Counter is a Map subclass for counting objects.
 * Elements are stored as keys and their counts are stored as values.
 * This is similar to Python's collections.Counter.
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

  sorted(): [T, number][] {
    return Array.from(this.entries()).sort((a, b) => b[1] - a[1]);
  }

  sum(): number {
    return Array.from(this.values()).reduce((a, b) => a + b);
  }
}
