import dedent from 'dedent';

import { MaybeHasChildren, treeIterator } from './has-children';
import { HasKey, prettyPrint } from './has-key';

type Node = HasKey<number> & MaybeHasChildren<Node>;

describe('KeyedNode', () => {
  it('should iterate', () => {
    const tree: Node = {
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
    const tree: Node = {
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