/**
 * A binary search tree is a tree whose children hav special meaning.
 * Children are ordered into [left, right] (and each can be null).
 * Keys must be a number or convertible to a number.
 */

import { Tree } from './tree';
import { KeyedNode } from './keyed-node';
import { Comparable } from './utils/types';

enum Pos { Left, Right }

export function treeFindKey<T, K extends Comparable>(tree: KeyedNode<T, K>, id: K): KeyedNode<T, K> | undefined {
  if (id === tree.key) {
    return tree;
  }
  if (!tree.children) {
    return undefined;
  }
  if (id < tree.key && tree.children[0] != null) {
    return treeFindKey(tree.children[0], id);
  } else if (tree.children[1] != null) {
    return treeFindKey(tree.children[1], id);
  }
  return undefined;
}

export function treeInsert<T, K extends Comparable>(tree: KeyedNode<T, K>, node: KeyedNode<T, K>): void {
  if (tree.key === node.key) {
    tree.data = node.data;
    return;
  }

  const _treeInsertLeftOrRight = (tree: KeyedNode<T, K>, node: KeyedNode<T, K>, pos: Pos): void => {
    const children = tree.children || [null, null];
    if (children[pos] === null) {
      children[pos] = node;
    } else {
      treeInsert(children[pos] as KeyedNode<T, K>, node);
    }
    tree.children = children;
  }

  if (node.key < tree.key) {
    _treeInsertLeftOrRight(tree, node, Pos.Left);
  } else {
    _treeInsertLeftOrRight(tree, node, Pos.Right);
  }
}

export class BinarySearchTree<K extends Comparable, D = unknown> extends Tree<KeyedNode<D, K>> {
  constructor(tree: KeyedNode<D, K>) {
    super(tree);
  }
  findKey(key: K): KeyedNode<D, K> | undefined {
    return treeFindKey(this.root, key);
  }
  insert(node: KeyedNode<D, K>): void {
    treeInsert(this.root, node);
  }
}