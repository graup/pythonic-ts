import dedent from 'dedent';

import { treeIterator } from './tree';
import { KeyedNode, prettyPrint } from './keyed-node';

describe('KeyedNode', () => {
  it('should iterate', () => {
    const tree: KeyedNode<unknown, number> = {
      key: 1,
      children: [
        { key: 2, children: [ null, { key: 3 }] },
        { key: 4 },
      ],
    };
    const iteratedKeys = [...treeIterator(tree)].map(([node]) => node.key);
    expect(iteratedKeys).toStrictEqual([1, 2, 3, 4]);
  });
  it('should pretty print', () => {
    const tree: KeyedNode<unknown, number> = {
      key: 1,
      children: [
        { key: 2 },
        { key: 3 },
        null,
      ],
    };
    expect(prettyPrint(tree)).toBe(dedent`
      ↳ 1
        ↳ 2
        ↳ 3`);
    expect(prettyPrint(tree, true)).toBe(dedent`
    ↳ 1
      ↳ 2
      ↳ 3
      ↳ ()`);
  });
});