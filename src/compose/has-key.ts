import type { ToStringable } from '../utils/types';
import { MaybeHasChildren } from './has-children';

/**
 * A node that has a key
 */
export interface HasKey<Key = string> {
  key: Key;
}

/**
 * Pretty print a tree of keyed nodes (vertically).
 * @param tree root node
 * @param printNullNodes if false, null-valued children are skipped.
 */
export function prettyPrint<K extends ToStringable, Node extends HasKey<K> & MaybeHasChildren<Node>>(
  tree: Node,
  printNullNodes = false,
  nullSymbol = '()',
): string {
  const formatKey = (key: ToStringable, depth: number) => `${'  '.repeat(depth)}↳ ${key}`;

  function* iterate(node: Node, depth=0): Generator<string> {
    yield formatKey(node.key, depth);
    if (node.children) {
      for (const child of node.children) {
        if (child) {
          yield* iterate(child, depth + 1);
        } else if (printNullNodes) {
          yield formatKey(nullSymbol, depth + 1);
        }
      }
    }
  }
  return [...iterate(tree)].join('\n');
}