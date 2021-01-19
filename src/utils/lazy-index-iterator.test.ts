import { lazyIndexIterator } from './lazy-index-iterator';
import { treeIterator } from '../compose/has-children';

describe('lazyIndexIterator', () => {
  it('should do its thing', () => {
    function* iterator() {
      for (const i of [1, 2, 3, 4, 5]) {
        yield i;
      }
    }
    const lazyIndexer = lazyIndexIterator(iterator());
    expect(lazyIndexer(0)).toBe(lazyIndexer(0)); // returns same object
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
  it('should work with trees', () => {
    const tree = {
      key: 1,
      children: [
        {
          key: 2,
          children: [],
        },
      ],
    };
    const lazyIndexer = lazyIndexIterator(treeIterator(tree));
    expect(lazyIndexer(0)).toBe(lazyIndexer(0)); // returns same object
    expect(lazyIndexer(0)[0].key).toBe(1); // node key
    expect(lazyIndexer(0)[0].key).toBe(1); // node key
    expect(lazyIndexer(0)[1]).toBe(0); // depth
    expect(lazyIndexer(1)[0].key).toBe(2); // node key
    expect(lazyIndexer(1)[1]).toBe(1); // depth
    expect(() => lazyIndexer(2)).toThrow();
  });
});