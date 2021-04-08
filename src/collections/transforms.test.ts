import { keyBy, groupBy } from './transforms';

describe('keyBy', () => {
  it('should do basic operation', () => {
    const list = [
      { id: '1', value: 10 },
      { id: '2', value: 20 },
    ];
    const result = keyBy(list, a => a.id);
    expect(Object.fromEntries(result)).toStrictEqual({
      '1': { id: '1', value: 10 },
      '2': { id: '2', value: 20 },
    });
  });
  it('should do the docs example', () => {
    const list = [
      { dir: 'left', code: 97 },
      { dir: 'right', code: 100 },
    ];
    const result = keyBy(list, ({ code }) => String.fromCharCode(code));
    expect(Object.fromEntries(result)).toStrictEqual({
      a: { dir: 'left', code: 97 },
      d: { dir: 'right', code: 100 },
    });
  });
});

describe('groupBy', () => {
  it('should do basic operation', () => {
    const list = [
      { id: '1', value: 10 },
      { id: '2', value: 10 },
    ];
    const result = groupBy(list, a => a.value);
    expect(Array.from(result)).toStrictEqual([
      [10, [{ id: '1', value: 10 }, { id: '2', value: 10 }]],
    ]);
  });
  it('should do the example', () => {
    const result = groupBy([6.1, 4.2, 6.3], Math.floor);
    expect(Array.from(result)).toStrictEqual([
      [6, [6.1, 6.3]],
      [4, [4.2]],
    ]);
  });
});