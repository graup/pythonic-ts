import { FileTree, treeFindPath } from './fileTree';

describe('FileTree.fromList', () => {
  it('should create tree', () => {
    const files = [
      { path: '/1/2/a' },
      { path: '/1/2/3/a' },
      { path: '/1/2/3/b' },
    ];
    const fileTreeFromList = FileTree.fromList(files);
    const nodes = [...fileTreeFromList].map(([node]) => node.key);
    expect(nodes).toEqual(['ROOT', '1', '2', 'a', '3', 'a', 'b']);
  });
  it('should create tree from relative paths', () => {
    const files = [
      { path: '1' },
      { path: '2/a' },
      { path: '2/b' },
      { path: '3' },
    ];
    const fileTreeFromList = FileTree.fromList(files);
    const nodes = [...fileTreeFromList].map(([node]) => `${node.children && node.children.length ? 'dir ' : 'file '}${node.key}`);
    expect(nodes).toEqual(['dir ROOT', 'file 1', 'dir 2', 'file a', 'file b', 'file 3']);
  });
});

describe('FileTree.findPath', () => {
  it('should find key by path', () => {
    const fileTree = new FileTree({
      key: '/1',
      children: [
        { key: '/1/1', children: [ { key: '/1/1/1' }] },
        { key: '/1/2' },
      ],
    });
    const node = fileTree.findPath('/1/1/1');
    expect(node).toBeDefined();
    expect(node?.key).toBe('/1/1/1');
    
    // Lower-level API should give same result.
    // Note that this operates on each node's full key by default
    // whereas FileTree.findPath uses the key's basename.
    const node2 = treeFindPath(fileTree.root, ['/1', '/1/1', '/1/1/1']);
    expect(node2).toBeDefined();
    expect(node2).toBe(node);
  });
  it('should return undefined for not found path', () => {
    const fileTree = new FileTree({ key: '/1' });
    const node = fileTree.findPath('/234');
    expect(node).toBeUndefined();

    // same result but slightly different code path (because the first key matches)
    const node2 = fileTree.findPath('/1/3');
    expect(node2).toBeUndefined();
  });
});

describe('FileTree as a binary search tree', () => {
  it('should find key by path', () => {
    const fileTree = new FileTree<{ value: number }>({
      key: 'ROOT',
      children: [
        { key: 'LEFT', children: [
          { key: 'LEFT', children: [
            { key: 'LEAF', data: { value: 1234 } },
          ] },
        ] },
        { key: 'RIGHT' },
      ],
    });
    const node = fileTree.findPath(['LEFT', 'LEFT', 'LEAF']);
    expect(node).toBeDefined();
    expect(node?.data?.value).toBe(1234);
  });
});