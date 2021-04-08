import { range } from './range';

describe('range', () => {
  it('returns iterator by providing stop value', () => {
    let sum = 0;
    for (const i of range(3)) {
      sum += i;
    }
    expect(sum).toBe(3);
  });
  it('supports Array functions', () => {
    const numbers = Array.from(range(3));
    expect(numbers).toStrictEqual([0, 1, 2]);
  });
  it('returns iterator by providing start and stop value', () => {
    let sum = 0;
    for (const i of range(10, 30)) {
      sum += i;
    }
    expect(sum).toBe(390);
  });
  it('returns iterator by providing start, stop and step value', () => {
    let sum = 0;
    for (const i of range(10, 30, 10)) {
      sum += i;
    }
    expect(sum).toBe(30);
  });
  it('supports negative steps', () => {
    const numbers = Array.from(range(0, -3, -1));
    expect(numbers).toStrictEqual([0, -1, -2]);
  });
  it('supports indexOf', () => {
    const r = range(10);
    expect(r.indexOf(5)).toBe(5);
    expect(r.indexOf(11)).toBe(-1);
    expect(r.indexOf(-1)).toBe(-1);
    const r2 = range(100, 200, 10);
    expect(r2.indexOf(150)).toBe(5);
    expect(r2.indexOf(200)).toBe(-1);
    expect(r2.indexOf(99)).toBe(-1);
  });
});