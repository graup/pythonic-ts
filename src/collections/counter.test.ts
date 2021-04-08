import { Counter } from './counter';
import { range } from '../iterators/range';

describe('Counter', () => {
  it('should count from strings', () => {
    const counter = new Counter(['a', 'a', 'b']);
    expect(counter.size).toBe(2);
    expect(counter.get('a')).toBe(2);
    expect(counter.get('b')).toBe(1);
  });
  it('should count from objects', () => {
    const a = { id: 'a' };
    const b = { id: 'b' };
    const counter = new Counter([a, b, b]);
    expect(counter.get(a)).toBe(1);
    expect(counter.get(b)).toBe(2);
  });
  it('should update count', () => {
    const counter = new Counter(['a', 'a', 'b']);
    counter.update(['a']).update(['c']);
    expect(counter.size).toBe(3);
    expect(counter.get('a')).toBe(3);
    expect(counter.get('b')).toBe(1);
    expect(counter.get('c')).toBe(1);
  });
  it('should sort', () => {
    const counter = new Counter(['b', 'a', 'a']);
    const sorted = counter.sorted();
    expect(sorted).toStrictEqual([
      ['a', 2],
      ['b', 1],
    ]);
  });
  it('should return 0 for missing element', () => {
    const counter = new Counter();
    expect(counter.get('c')).toBe(0);
  });
  it('should return sum', () => {
    const counter = new Counter(['a', 'b']);
    counter.update(['b', 'c']);
    expect(counter.sum()).toBe(4);
  });
  it('should construct from Map', () => {
    const counter = new Counter(
      new Map([
        ['a', 1],
        ['b', 2],
      ]),
    );
    counter.update(['b', 'c']);
    expect(counter.get('a')).toBe(1);
    expect(counter.get('b')).toBe(3);
  });
  it('should update from Map', () => {
    const counter = new Counter(['a']);
    counter.update(new Map([['a', 3]]));
    expect(counter.get('a')).toBe(4);
  });
  it('should update from Counter', () => {
    const counter1 = new Counter(['a']);
    const counter2 = new Counter(['a', 'b']);
    counter1.update(counter2);
    expect(counter1.get('a')).toBe(2);
    expect(counter1.get('b')).toBe(1);
  });
  it('should construct from iterator', () => {
    const counter = new Counter(range(2));
    counter.update([1, 2]);
    expect(counter.get(1)).toBe(2);
    expect(counter.get(2)).toBe(1);
  });
});
