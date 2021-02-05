export function getCombatantSheet(combatant: Combatant): ActorSheet | null {
  const actor: Actor = combatant.actor
  const sheet = actor?.sheet as ActorSheet

  return sheet ?? null
}
