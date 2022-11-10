export function isActive(module: string): boolean {
  const gameGlobal = game as unknown as Game
  return gameGlobal.modules.get(module)?.active ?? false
}
