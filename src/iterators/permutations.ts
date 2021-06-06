/**
 * 
 * Source: https://github.com/melkir/permutation-iterator/blob/master/index.js
 */
export function* permutations<T>(input: readonly T[]): Iterable<T[]> {
  const array = input.slice();
  const { length } = array;
  const c = new Array(length).fill(0);
  let i = 1;

  yield array.slice();

  // Heap's method, time complexity O(N)
  while (i < length) {
    if (c[i] < i) {
      const k = i % 2 && c[i];
      const p = array[i];
      array[i] = array[k];
      array[k] = p;
      ++c[i];
      i = 1;
      yield array.slice();
    } else {
      c[i] = 0;
      ++i;
    }
  }
}
