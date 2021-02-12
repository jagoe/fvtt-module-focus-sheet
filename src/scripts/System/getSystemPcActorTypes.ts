export function getSystemPcActorTypes(): string[] {
  const system = game.system.id

  if (system === 'dnd5e') {
    return ['character']
  }

  return []
}
