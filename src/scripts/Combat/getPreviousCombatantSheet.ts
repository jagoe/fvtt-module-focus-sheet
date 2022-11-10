import { getCombatantSheet } from './getCombatantSheet'

export function getPreviousCombatantSheet(combat: Combat): ActorSheet | null {
  if (!combat.started) {
    // combat hasn't started yet
    return null
  }

  const { turn, turns } = combat
  if (turns === undefined || turns.length <= 1 || turn === null) {
    // none or only one combatant; won't close the sheet to immediately re-open it
    return null
  }

  const previousTurnIndex = turn === 0 ? turns.length - 1 : turn - 1
  const previousTurn = turns[previousTurnIndex]

  return getCombatantSheet(previousTurn)
}
