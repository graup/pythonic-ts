import dedent from 'dedent';

import { MaybeHasChildren } from '../compose/has-children';
import { prettyPrint } from './pretty-print';

type Node = MaybeHasChildren<Node> & { data: number };

describe('KeyedNode', () => {
  it('should pretty print', () => {
    const tree: Node = {
      data: 1,
      children: [
        { data: 2 },
        { data: 3 },
        null,
      ],
    };
    expect(prettyPrint(tree)).toBe(dedent`
      ↳ [object Object]
        ↳ [object Object]
        ↳ [object Object]`);
    expect(prettyPrint(tree, { printNullNodes: true })).toBe(dedent`
      ↳ [object Object]
        ↳ [object Object]
        ↳ [object Object]
        ↳ ()`);
  });
});