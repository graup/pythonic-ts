export * from './has-children';
export * from './has-parent';
export * from './has-key';

import { HasKey } from './has-key';
import { MaybeHasChildren } from './has-children';

export type KeyedDataNode<Data, Key> = HasKey<Key> & MaybeHasChildren<KeyedDataNode<Data, Key>> & { data?: Data };
