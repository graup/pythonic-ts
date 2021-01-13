
import { Tree, treeIterator, treeFind } from './tree';
import { KeyedNode } from './keyed-node';

const tree = new Tree<KeyedNode<{ value: number }>>({
  key: '1',
  data: { value: 1 },
  children: [
    { key: '1/1', children: [
      { key: '1/1/1', data: { value: 2 } },
      null,
    ] },
    { key: '1/2' },
  ],
});

describe('Tree.iterator', () => {
  it('should iterate DFS', () => {
    const nodes = [...tree].map(([node, depth]) => `(${depth})${node.key}`);
    expect(nodes).toEqual(['(0)1', '(1)1/1', '(2)1/1/1', '(1)1/2']);
    // Lower-level API should give same result
    const nodes2 = [...treeIterator(tree.root)].map(([node, depth]) => `(${depth})${node.key}`);
    expect(nodes).toEqual(nodes2);
  });
  it('should iterate BFS', () => {
    const nodes = [...tree.iterator(true)].map(([node]) => node.key);
    expect(nodes).toEqual(['1', '1/1', '1/2', '1/1/1']);
    // Lower-level API should give same result
    const nodes2 = [...treeIterator(tree.root, true)].map(([node]) => node.key);
    expect(nodes).toEqual(nodes2);
  });
});
describe('Tree.find', () => {
  it('should find a node by key', () => {
    const predicate = jest.fn((node: KeyedNode) => node.key === '1/1/1');
    const node = tree.find(predicate);
    expect(predicate).toHaveBeenCalledTimes(3);
    expect(node).toBeDefined();
    expect(node?.key).toBe('1/1/1');
    expect(node?.data?.value).toBe(2);
    // Lower-level API should give same result
    const node2 = treeFind(tree.root, node => node.key === '1/1/1');
    expect(node).toBe(node2);
  });
  it('should find a node by key, BFS', () => {
    const predicate = jest.fn((node: KeyedNode) => node.key === '1/1/1');
    const node = tree.find(predicate, true);
    expect(predicate).toHaveBeenCalledTimes(4);
    expect(node).toBeDefined();
    expect(node?.key).toBe('1/1/1');
    // Lower-level API should give same result
    const node2 = treeFind(tree.root, node => node.key === '1/1/1', true);
    expect(node).toBe(node2);
  });
  it('should return undefined for not found', () => {
    const node = tree.find(() => false);
    expect(node).toBeUndefined();
  });
});
describe('Tree.toJSON', () => {
  it('should return json', () => {
    const smallTree = new Tree<KeyedNode>({ key: 'a', children: [ { key: 'b' }] });
    expect(JSON.stringify(smallTree)).toBe('{"key":"a","children":[{"key":"b"}]}');
  })
});