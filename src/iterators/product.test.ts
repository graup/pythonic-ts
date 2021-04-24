

import { product } from './product';

describe('mapIterator', () => {
  it('should do its thing', () => {
    const p = product(
      ['a', 'b'],
      [1, 2, 3],
      [true, false],
    );
    const arr = Array.from(p);
    expect(arr.length).toBe(2*3*2);
  });
  it('should run example', () => {
    const p = product([1, 2, 3], [true, false]);
    const arr = Array.from(p);
    expect(arr).toEqual([[1, true], [2, true], [3, true], [1, false], [2, false], [3, false]]);
  });
  it('works with empty iterator', () => {
    const p = product(
      ['a', 'b'],
      [1, 2, 3],
      [],
    );
    const arr = Array.from(p);
    expect(arr.length).toBe(2*3);
  });
  it('works with no arguments', () => {
    const p = product();
    const arr = Array.from(p);
    expect(arr.length).toBe(0);
  });
});