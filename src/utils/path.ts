export function splitPath(path: string): string[] {
  return path.replace(/\/$/, '').replace(/^\//, '').split('/');
}

export function basename(path: string): string {
  return path.substr(path.lastIndexOf('/') + 1);
}