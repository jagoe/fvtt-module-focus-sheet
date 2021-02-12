export function isPC(combatant: Combatant, pcActorTypes: string[]): boolean {
  if (combatant.actor === undefined) {
    return false
  }

  return pcActorTypes.includes(combatant.actor.data.type)
}
