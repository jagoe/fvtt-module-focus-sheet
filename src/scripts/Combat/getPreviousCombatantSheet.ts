import {getCombatantSheet} from './getCombatantSheet'

export function getPreviousCombatantSheet(combat: Combat): ActorSheet | null {
  const {combatants} = combat
  if (combatants === undefined || combatants.length === 0) {
    // no active combat or no combatants
    return null
  }

  if (combatants.length === 1) {
    // won't close the sheet only to immediately re-open it
    return null
  }

  const currentCombatantIndex = combatants.indexOf(combat.combatant)
  const previousCombatantIndex = currentCombatantIndex > 0 ? currentCombatantIndex - 1 : combatants.length - 1
  const previousCombatant = combatants[previousCombatantIndex]

  return getCombatantSheet(previousCombatant)
}
