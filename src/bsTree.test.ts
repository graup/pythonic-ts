import dedent from 'dedent';

import { BinarySearchTree, treeInsert } from './bsTree';
import { prettyPrintKeys } from './compose/has-key';

describe('BinarySearchTree', () => {
  it('should find', () => {
    const bst = new BinarySearchTree<number>({
      key: 5,
      children: [
        { key: 1 },
        { key: 10 },
      ],
    });
    const node1 = bst.findKey(10);
    expect(node1).toBeDefined();
    const node2 = bst.findKey(1);
    expect(node2).toBeDefined();
  });
  it('should not find', () => {
    const bst = new BinarySearchTree<number>({
      key: 5,
    });
    const node = bst.findKey(10);
    expect(node).toBeUndefined();
  });
  it('should not find (null children)', () => {
    const bst = new BinarySearchTree<number>({
      key: 5,
      children: [null, null],
    });
    const node = bst.findKey(10);
    expect(node).toBeUndefined();
  });
  it('should insert', () => {
    const tree = { key: 2 };
    treeInsert(tree, { key: 10 });
    treeInsert(tree, { key: 1 });
    treeInsert(tree, { key: 3 });
    treeInsert(tree, { key: 4 });
    treeInsert(tree, { key: 8 });
    const printedTree = dedent`
    ↳ 2
      ↳ 1
      ↳ 10
        ↳ 3
          ↳ ()
          ↳ 4
            ↳ ()
            ↳ 8
        ↳ ()`;
    expect(prettyPrintKeys(tree, { printNullNodes: true })).toBe(printedTree);
  });
  it('should overwrite', () => {
    const tree = new BinarySearchTree({ key: 2, children: [null, null] });
    tree.insert({ key: 2, data: 'foo' });
    expect(tree.root.data).toBe('foo');
  });
});