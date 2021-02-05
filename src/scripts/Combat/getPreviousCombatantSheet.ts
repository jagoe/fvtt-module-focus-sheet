import {getCombatantSheet} from './getCombatantSheet'

export function getPreviousCombatantSheet(combat: Combat): ActorSheet | null {
  if (combat.combatants === undefined || combat.combatants.length === 0) {
    // no active combat or no combatants
    return null
  }

  const currentCombatantIndex = combat.combatants.indexOf(combat.combatant)
  const previousCombatantIndex = currentCombatantIndex > 0 ? currentCombatantIndex - 1 : combat.combatants.length - 1
  const previousCombatant = combat.combatants[previousCombatantIndex]

  return getCombatantSheet(previousCombatant)
}
