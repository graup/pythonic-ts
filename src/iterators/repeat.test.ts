import { repeat } from './repeat';
import { take } from './take';

describe('repeat', () => {
  it('repeats specified number of times', () => {
    const z = repeat('a', 3);
    expect(Array.from(z)).toStrictEqual(['a', 'a', 'a']);
  });
  it('repeats infinitely', () => {
    const z = repeat('a');
    expect(Array.from(take(z, 5))).toStrictEqual(['a', 'a', 'a', 'a', 'a']);
  });
});

