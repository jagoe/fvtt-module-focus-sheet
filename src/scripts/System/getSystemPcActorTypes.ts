export function getSystemPcActorTypes(): string[] {
  const gameGlobal = game as unknown as Game
  const system = gameGlobal.system.id

  if (system === 'dnd5e') {
    return ['character']
  }

  return []
}
