import { MaybeHasChildren } from '../compose/has-children';

interface PrintOptions<Node> {
  formatNode: (node: Node) => string;
  printNullNodes: boolean;
  nullSymbol: string;
  indent: string;
}

/**
 * Pretty print a tree of nodes (vertically).
 * @param tree root node
 * @param options.formatNode convert node into text
 * @param options.printNullNodes if false, null-valued children are skipped.
 * @param options.nullSymbol string used for null values
 */
export function prettyPrint<Node extends MaybeHasChildren<Node>>(
  tree: Node,
  {
    formatNode = (node: Node) => `${node}`,
    printNullNodes = false,
    nullSymbol = '()',
    indent = '  ',
  }: Partial<PrintOptions<Node>> = {},
): string {
  const format = (text: string, depth: number) => `${indent.repeat(depth)}↳ ${text}`;

  function* iterate(node: Node, depth=0): Generator<string> {
    yield format(formatNode(node), depth);
    if (node.children) {
      for (const child of node.children) {
        if (child) {
          yield* iterate(child, depth + 1);
        } else if (printNullNodes) {
          yield format(nullSymbol, depth + 1);
        }
      }
    }
  }

  return [...iterate(tree)].join('\n');
}