import { lazyIndexIterator } from './lazy-index-iterator';

describe('lazyIndexIterator', () => {
  it('should do its thing', () => {
    function* iterator() {
      for (const i of [1, 2, 3, 4, 5]) {
        yield i;
      }
    }
    const lazyIndexer = lazyIndexIterator(iterator());
    expect(lazyIndexer(0)).toBe(1);
    expect(lazyIndexer(0)).toBe(1);
    expect(lazyIndexer(2)).toBe(3);
    expect(lazyIndexer(4)).toBe(5);
  });
  it('should throw when out of bounds', () => {
    function* iterator() {
      for (const i of [1, 2, 3, 4, 5]) {
        yield i;
      }
    }
    const lazyIndexer = lazyIndexIterator(iterator());
    expect(() => lazyIndexer(5)).toThrow();
  });
});