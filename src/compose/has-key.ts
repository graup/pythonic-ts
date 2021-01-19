import type { ToStringable } from '../utils/types';
import { MaybeHasChildren } from './has-children';
import { prettyPrint } from '../utils/pretty-print';

/**
 * A node that has a key
 */
export interface HasKey<Key = string> {
  key: Key;
}

interface PrintOptions {
  printNullNodes: boolean;
  nullSymbol: string;
}

/**
 * Pretty print a tree of keyed nodes (vertically).
 * @param tree root node
 * @param printNullNodes if false, null-valued children are skipped.
 */
export function prettyPrintKeys<K extends ToStringable, Node extends HasKey<K> & MaybeHasChildren<Node>>(
  tree: Node,
  {
    printNullNodes = false,
    nullSymbol = '()',
  }: Partial<PrintOptions> = {},
): string {
  return prettyPrint(tree, {
    formatNode: (node) => `${node.key}`,
    printNullNodes,
    nullSymbol,
  });
}