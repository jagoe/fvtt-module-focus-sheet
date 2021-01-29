import {focusCombatantSheet} from '../Sheet/index'

export function initialize(): void {
  Hooks.on('updateCombat', focusCombatantSheet)
}
