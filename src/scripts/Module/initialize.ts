import {focusCombatantSheet} from './focusCombatantSheet'
import {registerSettings} from '../Settings/registerSettings'

export function initialize(): void {
  Hooks.once('init', registerSettings)

  Hooks.on('updateCombat', focusCombatantSheet)
}
