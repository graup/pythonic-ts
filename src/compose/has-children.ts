import type { Nullable, Predicate } from '../utils/types';
import { Queue } from '../utils/queue';
import { iterateNonNull } from '../utils/iterators';

/**
 * A node that has children. Children can be empty and may include null elements.
 */
export interface HasChildren<N> {
  children: Nullable<N>[];
}

/**
 * A node that maybe has children. Children can be empty and may include null elements.
 */
export interface MaybeHasChildren<N> {
  children?: Nullable<N>[];
}

export function hasChildren<N>(node: MaybeHasChildren<N>): node is HasChildren<N> {
  return node.children && node.children.length > 0 || false;
}

type IteratorYield<Node> = [node: Node, depth: number];

function* treeIteratorDepthFirst<Node extends MaybeHasChildren<Node>>(node: Node, depth = 0): Generator<IteratorYield<Node>> {
  yield [node, depth];
  if (hasChildren(node)) {
    for (const child of iterateNonNull(node.children)) {
      yield* treeIteratorDepthFirst(child as Node, depth + 1);
    }
  }
}

function* treeIteratorBreadthFirst<Node extends MaybeHasChildren<Node>>(node: Node): Generator<IteratorYield<Node>> {
  const queue = new Queue<IteratorYield<Node>>([node, 0]);
  while (!queue.isEmpty) {
    const [node, depth] = queue.dequeue();
    yield [node, depth];
    if (hasChildren(node)) {
      for (const child of iterateNonNull(node.children)) {
        queue.enqueue([child, depth + 1]);
      }
    }
  }
} 

export function treeIterator<Node extends MaybeHasChildren<Node>>(
  node: Node,
  breadthFirstSearch=false,
): Generator<IteratorYield<Node>> {
  if (breadthFirstSearch) {
    return treeIteratorBreadthFirst(node);
  } else {
    return treeIteratorDepthFirst(node);
  }
}

export function treeFind<Node extends MaybeHasChildren<Node>>(
  tree: Node,
  predicate: Predicate<Node>,
  breadthFirstSearch=false,
): Node | undefined {
  for (const [node] of treeIterator(tree, breadthFirstSearch)) {
    if (predicate(node)) {
      return node;
    }
  }
  return undefined;
}