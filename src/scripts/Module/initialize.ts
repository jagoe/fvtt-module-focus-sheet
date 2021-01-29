import {focusCombatantSheet} from './focusCombatantSheet'
import {registerSettings} from './registerSettings'

export function initialize(): void {
  Hooks.on('init', registerSettings)

  Hooks.on('updateCombat', focusCombatantSheet)
}
