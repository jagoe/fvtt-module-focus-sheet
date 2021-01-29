export function isActive(module: string): boolean {
  return game.modules.get(module)?.active ?? false
}
