
import { HasParent, iterateAncestors, findAncestor } from './has-parent';

type Node = HasParent<Node> & { data: number };

describe('HasParent', () => {
  const nodeA: Node = {
    data: 1,
    parent: null,
  };
  const nodeB: Node = {
    data: 2,
    parent: nodeA,
  };

  it('should iterate ancestors', () => {
    const iteratedKeys = [...iterateAncestors(nodeB)].map((node) => node.data);
    expect(iteratedKeys).toStrictEqual([1]);
  });
  it('should find ancestors', () => {
    const node = findAncestor(nodeB, n => n.data === 1);
    expect(node).toBeDefined();
    expect(node?.data).toBe(1);
  });
  it('should not find ancestors', () => {
    const node = findAncestor(nodeB, n => n.data === 2);
    expect(node).toBeUndefined();
  });
});