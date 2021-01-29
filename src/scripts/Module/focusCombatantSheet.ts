import {focus, getPopout} from '../Modules/Popout/index'

import {Settings} from '../Settings'
import {getCombatantSheet} from '../Combat/index'

/**
 * Focus the current actor/token sheet of the current combatant.\
 * Does nothing if there is no active combatant or if the sheet is not currently open.
 *
 * @param combat A Combat instance (usually provided by a hook)
 */
export function focusCombatantSheet(combat: Combat): void {
  const settings = Settings.GetInstance()

  const sheet = getCombatantSheet(combat)
  if (!sheet) {
    // combatant does not have a sheet
    return
  }

  if (!sheet.rendered && !settings.AutoOpen.Enabled) {
    // combatant does not have a sheet
    return
  }

  if (!sheet.rendered) {
    sheet.render(true)
    return
  }

  const popout = getPopout(sheet)
  if (popout !== null) {
    focus(popout)
  } else {
    sheet.bringToTop()
  }
}
