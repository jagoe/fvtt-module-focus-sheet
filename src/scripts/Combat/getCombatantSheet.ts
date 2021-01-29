export function getCombatantSheet(combat: Combat): ActorSheet | null {
  if (!combat.combatant) {
    // no active combatant
    return null
  }

  const actor: Actor = combat.combatant.actor
  const sheet = actor?.sheet as ActorSheet

  return sheet ?? null
}
