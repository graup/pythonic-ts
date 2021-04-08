import { take } from './take';

describe('take', () => {
  it('takes n items', () => {
    const data = [1, 2, 3];
    const z = take(data.values(), 2);
    expect(Array.from(z)).toStrictEqual([1, 2]);
  });
  it('takes 0 items', () => {
    const data = [1, 2, 3];
    const z = take(data.values(), 0);
    expect(Array.from(z)).toStrictEqual([]);
  });
  it('stops taking when iterator is exhausted', () => {
    const data = [1, 2, 3];
    const z = take(data.values(), 4);
    expect(Array.from(z)).toStrictEqual([1, 2, 3]);
  });
});

