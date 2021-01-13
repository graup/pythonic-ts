

/**
 * A file tree is a tree whose nodes are path segments.
 * This makes search more efficient.
 */
import { Tree } from './tree';
import { basename, splitPath } from './utils/path';
import { iterateNonNull } from './utils/iterators';
import { KeyedNode } from './keyed-node';

type PathMatchFn<Node extends KeyedNode = KeyedNode> = (subPath: string, node: Node) => boolean;
const defaultPathMatch: PathMatchFn = (subPath, node) => node.key === subPath;

/**
 * Find node matching path
 */
export function treeFindPath<Node extends KeyedNode>(
  tree: Node,
  keyPath: string[],
  pathMatch: PathMatchFn = defaultPathMatch,
): Node | undefined {
  function _searchNode(node: Node, keyPath: string[], accumPath: string[]): Node | undefined {
    if (keyPath.length === 0) return node;
    if (!node.children) return undefined;
    const keyPathElement = keyPath.shift() as string;
    for (const child of iterateNonNull(node.children)) {
      if (pathMatch(keyPathElement, child)) {
        return _searchNode(child as Node, keyPath, [...accumPath, child.key]);
      }
    }
    return undefined;
  }
  return _searchNode(tree, keyPath, []);
}

type ReducerResult<D> = {
  [index: string]: ReducerResult<D> | KeyedNode<D>[];
  result: KeyedNode<D>[];
}
/**
 * Takes a list of files with full paths and returns a tree of path segments.
 */
export function fileListToTree<D extends { path: string; name?: string }>(files: D[]): KeyedNode<D>[] {
  const result: KeyedNode<D>[] = [];
  const level: ReducerResult<D> = { result };
  files.forEach(file => {
    let path = file.path;
    if (path[0] !== '/') path = `/${path}`; // always need absolute paths for tree
    // Create nodes for every path segment
    path.split('/').slice(1).reduce((r, key) => {
      if (!r[key]) {
        r[key] = { result: [] };
        const data: KeyedNode<D> = { key, children: (r[key] as ReducerResult<D>).result };
        if (file.name === key || basename(file.path) === key) {
          data.data = file;
        }
        r.result.push(data);
      }
      return r[key] as ReducerResult<D>;
    }, level);
  });
  return result;
}

export class FileTree<D> extends Tree<KeyedNode<D>> {
  constructor(tree: KeyedNode<D>) {
    super(tree);
    // FileTrees need to have a single root node
    if (tree.key !== 'ROOT') {
      this.root = { key: 'ROOT', children: [tree] };
    }
  }
  findPath(path: string | string[]): KeyedNode<D> | undefined {
    return treeFindPath(
      this.root,
      Array.isArray(path) ? path : splitPath(path),
      (subPath, node) => basename(node.key) === subPath,
    );
  }
  static fromList<D extends { path: string; name?: string }>(list: D[]): FileTree<D> {
    return new FileTree<D>({ key: 'ROOT', children: fileListToTree(list) });
  }
}