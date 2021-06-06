import { permutations } from './permutations';

describe('permutations', () => {
  it('should do its thing', () => {
    const p = permutations([0, 1, 2]);
    const expected = [[0, 1, 2], [1, 0, 2], [2, 0, 1], [0, 2, 1], [1, 2, 0], [2, 1, 0]];
    expect(Array.from(p)).toStrictEqual(expected);
  });
});