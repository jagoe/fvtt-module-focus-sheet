import {closePreviousCombatantSheet} from './closePreviousCombatantSheet'
import {focusCombatantSheet} from './focusCombatantSheet'
import {registerSettings} from '../Settings/registerSettings'

export function initialize(): void {
  // de-register any existing hooks
  Hooks.off('init', registerSettings)
  Hooks.off('updateCombat', focusCombatantSheet)
  Hooks.off('updateCombat', closePreviousCombatantSheet)

  // register hooks based on settings
  Hooks.once('init', registerSettings)
  Hooks.on('updateCombat', focusCombatantSheet)
  // register regardless of settings, so they can be changed without reloading
  Hooks.on('updateCombat', closePreviousCombatantSheet)
}
