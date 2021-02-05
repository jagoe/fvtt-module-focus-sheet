import {Settings} from '../Settings'
import {closePreviousCombatSheet} from './closePreviousCombatSheet'
import {focusCombatantSheet} from './focusCombatantSheet'
import {registerSettings} from '../Settings/registerSettings'

export function initialize(): void {
  const settings = Settings.GetInstance()

  // load/reset settings
  settings.Reset()

  // de-register any existing hooks
  Hooks.off('init', registerSettings)
  Hooks.off('updateCombat', focusCombatantSheet)
  Hooks.off('updateCombat', closePreviousCombatSheet)

  // register hooks based on settings
  Hooks.once('init', registerSettings)
  Hooks.on('updateCombat', focusCombatantSheet)

  if (settings.AutoClose) {
    Hooks.on('updateCombat', closePreviousCombatSheet)
  }
}
