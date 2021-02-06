import {getCombatantSheet} from './getCombatantSheet'

export function getCurrentCombatantSheet(combat: Combat): ActorSheet | null {
  if (combat.combatant === undefined) {
    // no active combatant
    return null
  }

  return getCombatantSheet(combat.combatant)
}
