import { Queue } from './queue';

describe('Queue', () => {
  it('should construct empty', () => {
    const queue = new Queue<number>();
    expect(queue.size).toBe(0);
    expect(queue.isEmpty).toBe(true);
  });

  it('should construct from args', () => {
    const queue = new Queue(1, 2, 3);
    expect(queue.size).toBe(3);
    expect(queue.isEmpty).toBe(false);
  });

  it('should enqueue', () => {
    const queue = new Queue();
    queue.enqueue(1);
    expect(queue.size).toBe(1);
    expect(queue.isEmpty).toBe(false);
  });

  it('should dequeue', () => {
    const queue = new Queue(1);
    const elem = queue.dequeue();
    expect(elem).toBe(1);
  });

  it('should throw when nothing to dequeue', () => {
    const queue = new Queue();
    expect(() => {
      queue.dequeue();
    }).toThrow(Error);
  });
});