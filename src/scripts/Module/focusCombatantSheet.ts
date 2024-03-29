import { focus, open, playerHasPermissionToView } from '../Sheet'

import { Settings } from '../Settings'
import { getCurrentCombatantSheet } from '../Combat/index'
import { isPC } from '../Combatant'

/**
 * Focus the current actor/token sheet of the current combatant.\
 * Does nothing if there is no active combatant or if the sheet is not currently open.
 *
 * @param combat A Combat instance (usually provided by a hook)
 */
export async function focusCombatantSheet(combat: Combat): Promise<void> {
  if (!combat.started || combat.combatant === undefined) {
    // no active combat turn; nothing to do
    return
  }

  const settings = Settings.GetInstance()

  if (settings.IgnorePcSheets.Enabled && isPC(combat.combatant.actor, settings.IgnorePcSheets.ActorTypes)) {
    // PC sheets are ignored; nothing to do
    return
  }

  const sheet = getCurrentCombatantSheet(combat)
  if (!sheet) {
    // combatant does not have a sheet
    return
  }

  if (!playerHasPermissionToView(sheet)) {
    return
  }

  if (!sheet.rendered && !settings.AutoOpen.Enabled) {
    // combatant does not have a sheet
    return
  }

  if (sheet.rendered) {
    focus(sheet)
  } else {
    await open(sheet, settings.AutoOpen)
  }
}
