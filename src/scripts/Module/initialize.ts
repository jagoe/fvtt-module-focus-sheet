import {focusCombatantSheet} from './focusCombatantSheet'

export function initialize(): void {
  Hooks.on('updateCombat', focusCombatantSheet)
}
