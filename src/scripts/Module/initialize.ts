import {closeCurrentCombatantSheet} from './closeCurrentCombatantSheet'
import {closePreviousCombatantSheet} from './closePreviousCombatantSheet'
import {focusCombatantSheet} from './focusCombatantSheet'
import {registerSettings} from '../Settings'

export function initialize(): void {
  // de-register any existing hooks
  Hooks.off('init', registerSettings)
  Hooks.off('updateCombat', focusCombatantSheet)
  Hooks.off('updateCombat', closePreviousCombatantSheet)
  Hooks.off('deleteCombat', closeCurrentCombatantSheet)

  // register hooks based on settings
  Hooks.once('init', registerSettings)
  Hooks.on('updateCombat', focusCombatantSheet)
  Hooks.on('updateCombat', closePreviousCombatantSheet)
  Hooks.on('deleteCombat', closeCurrentCombatantSheet)
}
