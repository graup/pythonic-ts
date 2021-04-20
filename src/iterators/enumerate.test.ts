import { range } from './range';
import { enumerate } from './enumerate';

describe('enumerate', () => {
  it('should work with array', () => {
    const it = enumerate([1, 2, 3]);
    expect(Array.from(it)).toStrictEqual([[0, 1], [1, 2], [2, 3]]);
  });
  it('should work with iterable', () => {
    const it = enumerate(range(1, 3));
    expect(Array.from(it)).toStrictEqual([[0, 1], [1, 2]]);
  });
});