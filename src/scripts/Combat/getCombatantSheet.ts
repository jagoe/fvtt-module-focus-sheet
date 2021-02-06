export function getCombatantSheet({actor}: {actor?: Actor}): ActorSheet | null {
  const sheet = actor?.sheet as ActorSheet

  return sheet ?? null
}
