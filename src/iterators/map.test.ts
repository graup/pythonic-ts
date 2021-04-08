import { mapIterator } from './map';

describe('mapIterator', () => {
  it('should do its thing', () => {
    function* generator() {
      for (const i of [1, 2, 3, 4, 5]) {
        yield i;
      }
    }
    const mapped = mapIterator(generator(), (val) => val * 2);
    expect(Array.from(mapped)).toStrictEqual([2, 4, 6, 8, 10]);
  });
});