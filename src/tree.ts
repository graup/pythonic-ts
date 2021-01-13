/**
 * In its most basic form, a tree is a datastructure of nodes,
 * each of which can have an arbitrary number of children.
 */

import type { Nullable, Predicate } from './utils/types';
import { Queue } from './utils/queue';
import { iterateNonNull } from './utils/iterators';

export interface MaybeHasChildren<N> { children?: Nullable<N>[] }

function* treeIteratorDepthFirst<Node extends MaybeHasChildren<Node>>(node: Node, depth = 0): Generator<[Node, number]> {
  yield [node, depth];
  if (node.children) {
    for (const child of iterateNonNull(node.children)) {
      yield* treeIteratorDepthFirst(child as Node, depth + 1);
    }
  }
}

function* treeIteratorBreadthFirst<Node extends MaybeHasChildren<Node>>(node: Node): Generator<[Node, number]> {
  const queue = new Queue<[Node, number]>([node, 0]);
  while (!queue.isEmpty) {
    const [node, depth] = queue.dequeue();
    yield [node, depth];
    if (node.children) {
      for (const child of iterateNonNull(node.children)) {
        queue.enqueue([child, depth + 1]);
      }
    }
  }
} 

export function treeIterator<Node extends MaybeHasChildren<Node>>(
  node: Node,
  breadthFirstSearch=false,
): Generator<[Node, number]> {
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

/**
 * The class is just syntactic sugar, you can do everything with the functions too.
 */
export class Tree<N extends MaybeHasChildren<N>> {
  root: N;
  constructor(tree: N) {
    this.root = tree;
  }
  [Symbol.iterator](): Generator<[N, number]> {
    return this.iterator();
  }
  iterator(breadthFirstSearch=false): Generator<[N, number]> {
    return treeIterator(this.root, breadthFirstSearch);
  }
  find(predicate: Predicate<N>, breadthFirstSearch=false): N | undefined {
    return treeFind(this.root, predicate, breadthFirstSearch);
  }
  toJSON(): N {
    return this.root;
  }
}
