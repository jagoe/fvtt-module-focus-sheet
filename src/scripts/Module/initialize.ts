import { closeCurrentCombatantSheet } from './closeCurrentCombatantSheet'
import { closePreviousCombatantSheet } from './closePreviousCombatantSheet'
import { focusCombatantSheet } from './focusCombatantSheet'
import { registerSettings } from '../Settings'

export function initialize(): void {
  // de-register any existing hooks
  try {
    Hooks.off('init', registerSettings)
    Hooks.off('updateCombat', focusCombatantSheet)
    Hooks.off('updateCombat', closePreviousCombatantSheet)
    Hooks.off('deleteCombat', closeCurrentCombatantSheet)
  } catch {
    // Will throw if hook isn't registered, which would be fine for us
  }

  Hooks.once('init', registerSettings)
  Hooks.on('updateCombat', focusCombatantSheet)
  Hooks.on('updateCombat', closePreviousCombatantSheet)
  Hooks.on('deleteCombat', closeCurrentCombatantSheet)
}
