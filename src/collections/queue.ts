/**
 * A super simple queue built on an array.
 * The main advantage of using this is that `dequeue()` never returns `undefined`,
 * allowing to write type-checked code like this:
 * 
 * ```typescript
 * const queue = new Queue(1, 2, 3); // type: Queue<number>
 * while (!queue.isEmpty()) {
 *   const elem = queue.dequeue(); // type: number
 * }
 * ```
 * 
 * @typeParam T queue element
 */
export class Queue<T> {
  private queue: T[];
  
  constructor(...elements: T[]) {
    this.queue = elements;
  }
  enqueue(...elements: T[]): void {
    this.queue.push(...elements);
  }
  dequeue(): T {
    const element = this.queue.shift();
    if (!element) {
      throw new Error('Cannot dequeue from empty queue. Check isEmpty before calling dequeue.');
    }
    return element;
  }
  get size(): number {
    return this.queue.length;
  }
  get isEmpty(): boolean {
    return this.queue.length === 0;
  }
}