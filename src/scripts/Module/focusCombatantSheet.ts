import {focus, open, playerHasPermissionToView} from '../Sheet'

import {Settings} from '../Settings'
import {getCombatantSheet} from '../Combat/index'

/**
 * Focus the current actor/token sheet of the current combatant.\
 * Does nothing if there is no active combatant or if the sheet is not currently open.
 *
 * @param combat A Combat instance (usually provided by a hook)
 */
export async function focusCombatantSheet(combat: Combat): Promise<void> {
  const settings = Settings.GetInstance()

  const sheet = getCombatantSheet(combat)
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
    await open(sheet)
  }
}
