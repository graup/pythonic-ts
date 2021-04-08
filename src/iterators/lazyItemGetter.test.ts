import { lazyItemGetter } from './lazyItemGetter';

describe('lazyItemGetter', () => {
  it('should do its thing', () => {
    function* generate() {
      for (const i of [1, 2, 3, 4, 5]) {
        yield i;
      }
    }
    const getItem = lazyItemGetter(generate());
    expect(getItem(0)).toBe(getItem(0)); // returns same object
    expect(getItem(0)).toBe(1);
    expect(getItem(0)).toBe(1);
    expect(getItem(2)).toBe(3);
    expect(getItem(4)).toBe(5);
  });
  it('should throw when out of bounds', () => {
    function* generate() {
      for (const i of [1, 2, 3, 4, 5]) {
        yield i;
      }
    }
    const getItem = lazyItemGetter(generate());
    expect(() => getItem(5)).toThrow();
  });
});