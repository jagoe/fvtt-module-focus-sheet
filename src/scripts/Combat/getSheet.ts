export function getSheet(combat: Combat): BaseEntitySheet<{}, Entity<{}>> | null {
  if (!combat.combatant) {
    // no active combatant
    return null
  }

  const actor: Actor = combat.combatant.actor
  const sheet = actor.sheet

  return sheet ?? null
}
