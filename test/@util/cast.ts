/**
 * Casts the input object as T, effectively returning a stub
 * @param obj The input object cast as T
 */
export function cast<T>(obj: unknown): T {
  return obj as T
}
