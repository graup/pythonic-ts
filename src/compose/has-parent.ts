import type { Nullable, Predicate } from '../utils/types';

/**
 * A node that has a parent, allowing reverse traversal
 */
export interface HasParent<N> {
  parent: Nullable<N>;
}

/**
 * Iterate nodes upwards, i.e. by parent
 * @param tree 
 */
export function* iterateAncestors<Node extends HasParent<Node>>(tree: Node): Generator<Node> {
  let currentNode = tree;
  while (currentNode.parent) {
    yield currentNode.parent;
    currentNode = currentNode.parent;
  }
}

/**
 * Return the first direct ancestor matching the predicate
 * @param tree 
 * @param predicate 
 */
export function findAncestor<Node extends HasParent<Node>>(tree: Node, predicate: Predicate<Node>): Node | undefined {
  for (const node of iterateAncestors(tree)) {
    if (predicate(node)) {
      return node;
    }
  }
  return undefined;
}