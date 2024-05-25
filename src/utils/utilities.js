export function mapToArray(map) {
  return Object.entries(map).map(([key, value]) => value);
}
