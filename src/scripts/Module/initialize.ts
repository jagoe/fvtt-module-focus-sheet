import {focusCombatantSheet} from '../Sheet/index'

export function initialize() {
  Hooks.on('updateCombat', focusCombatantSheet)
}
