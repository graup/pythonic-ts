import { MaybeHasChildren, treeIterator, treeFind } from './compose/has-children';
import type { Predicate } from './utils/types';

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
