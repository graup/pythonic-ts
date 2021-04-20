function* positiveRange(start: number, stop: number, step: number): IterableIterator<number> {
  // r[i] = start + step*i where i >= 0 and r[i] < stop
  for (let i = start; i < stop; i += step) {
    yield i;
  }
}

function* negativeRange(start: number, stop: number, step: number): IterableIterator<number> {
  // r[i] = start + step*i where i >= 0 and r[i] > stop
  for (let i = start; i > stop; i += step) {
    yield i;
  }
}

function makeIterator(start: number, stop: number, step: number): IterableIterator<number> {
  if (start === 0 && step === 1) {
    // The simple case is always faster using the Array.keys iterator
    return Array(stop).keys();
  } 
  if (step < 0) {
    return negativeRange(start, stop, step);
  }
  return positiveRange(start, stop, step);
}

interface RangeIterator extends IterableIterator<number> {
  indexOf(value: number): number;
}

function annotate(iterator: IterableIterator<number>, start: number, stop: number, step: number): RangeIterator {
  const range = iterator as RangeIterator;
  range.indexOf = function indexOf(value: number): number {
    if (value >= stop || value < start) return -1;
    const idx = value - start;
    if (step === 1) return idx;
    return Math.trunc((value - start) / step);
  }; 
  return range;
}

/**
 * Returns an iterator of numbers and is commonly used for looping a specific number of times in for loops.
 * The API is the same as Python's range.
 * @return iterable iterator over range
 */
export function range(stop: number): RangeIterator;
export function range(start: number, stop: number): RangeIterator;
export function range(start: number, stop: number, step: number): RangeIterator;
export function range(...args: number[]): RangeIterator {
  let stop = 0, start = 0, step = 1;
  if (args.length === 1) {
    [stop] = args;
  } else {
    [start, stop, step = 1] = args;
  }
  const it = makeIterator(start, stop, step);
  return annotate(it, start, stop, step);
}
