export type Nullable<T> = T | null | undefined;

export type Predicate<T> = (node: T) => boolean;

export type ToStringable = string | { toString: () => string };

export type Comparable = number | string | { valueOf: () => number | string };
