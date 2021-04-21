import { defaultdict } from './defaultdict';

describe('defaultdict', () => {
  it('should work with arrays', () => {
    const dict = defaultdict<number[]>(Array);
    expect(dict.nonExistant).toStrictEqual([]);
    dict['a'].push(1);
    expect(dict.a).toStrictEqual([1]);
  });
  it('should work with numbers', () => {
    const dict = defaultdict(() => 0);
    expect(dict.nonExistant).toStrictEqual(0);
    dict['a'] += 10;
    dict['a'] += 10;
    expect(dict.a).toStrictEqual(20);
  });
  it('should run example from Python docs', () => {
    const s = [['yellow', 1], ['blue', 2], ['yellow', 3], ['blue', 4], ['red', 1]];
    const d = defaultdict(Array);
    for (const [k, v] of s) {
      d[k].push(v);
    }
    // Copy object because some reason jest cannot compare the proxy object
    expect({...d}).toEqual({'blue': [2, 4], 'red': [1], 'yellow': [1, 3]});
    // Note that you can do the same with groupBy(s, ([color]) => color)
  });
});