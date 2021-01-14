/**
 * A binary search tree is a tree whose children have special meaning.
 * Children are ordered into [left, right] (and each can be null).
 * Keys must be a number or convertible to a number.
 */

import { KeyedDataNode } from './compose';
import { Tree } from './tree';
import { Comparable, Nullable } from './utils/types';

enum Pos { Left, Right }

export type BSTNode<Data, Key extends Comparable> = KeyedDataNode<Data, Key>;

export function treeFindKey<T, K extends Comparable>(tree: BSTNode<T, K>, id: K): BSTNode<T, K> | undefined {
  if (id === tree.key) {
    return tree;
  }
  if (tree.children) {
    let child: Nullable<BSTNode<T, K>>;
    if (id < tree.key && (child = tree.children[Pos.Left]) != null ||
      (child = tree.children[Pos.Right]) != null) {
      return treeFindKey(child, id);
    }
  }
  return undefined;
}

export function treeInsert<T, K extends Comparable>(tree: BSTNode<T, K>, node: BSTNode<T, K>): void {
  if (tree.key === node.key) {
    tree.data = node.data;
    return;
  }
  const children = tree.children || [null, null];
  const insertPosition = node.key < tree.key ? Pos.Left : Pos.Right;
  const child = children[insertPosition];
  if (child) {
    treeInsert(child, node);
  } else {
    children[insertPosition] = node;
  }
  tree.children = children;
}

export class BinarySearchTree<K extends Comparable, D = unknown> extends Tree<BSTNode<D, K>> {
  constructor(tree: BSTNode<D, K>) {
    super(tree);
  }
  findKey(key: K): BSTNode<D, K> | undefined {
    return treeFindKey(this.root, key);
  }
  insert(node: BSTNode<D, K>): void {
    treeInsert(this.root, node);
  }
}