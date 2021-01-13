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
    return this.size === 0;
  }
}