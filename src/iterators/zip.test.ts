import { zip } from './zip';
import { repeat } from './repeat';
import { range } from './range';

describe('zip', () => {
  it('returns zipped iterator', () => {
    const z = zip([1, 2, 3], 'abc');
    expect(Array.from(z)).toStrictEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
  });
  it('works with iterable', () => {
    const z = zip(range(3), 'abc');
    expect(Array.from(z)).toStrictEqual([[0, 'a'], [1, 'b'], [2, 'c']]);
  });
  it('allows unzipping', () => {
    const [a, b] = [[1, 2, 3], 'abc'.split('')];
    const z = zip(a, b);
    const unzip = zip(...z);
    // TODO: find a way to narrow unzip's type
    expect(Array.from([a, b])).toStrictEqual(Array.from(unzip));
  });
  it('clustering series into n groups', () => {
    const data = repeat('ab', 3);
    const z = zip(...data);
    expect(Array.from(z)).toStrictEqual([['a', 'a', 'a'], ['b', 'b', 'b']]);
  });
});

