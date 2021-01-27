import {focusCombatantSheet} from '../Sheet/index.js'

export function initialize() {
  Hooks.on('updateCombat', focusCombatantSheet)
}
