import {Sheet} from '../Sheet'

export function getCombatantSheet(combat: Combat): Sheet | null {
  if (!combat.combatant) {
    // no active combatant
    return null
  }

  const actor: Actor = combat.combatant.actor
  const sheet = actor?.sheet

  return sheet ?? null
}
