export function getCombatantSheet({ actor }: Combatant): ActorSheet | null {
  const sheet = actor?.sheet as unknown as ActorSheet

  return sheet ?? null
}
