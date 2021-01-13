export function* iterateNonNull<T>(objects: T[]): Generator<NonNullable<T>> {
  for (const obj of objects) {
    if (obj !== null && typeof obj !== 'undefined') {
      yield obj as NonNullable<T>;
    }
  }
}