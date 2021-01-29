import {focus, getPopout} from '../Popout/index'

import {getCombatantSheet} from '../Combat/index'

/**
 * Focus the current actor/token sheet of the current combatant.\
 * Does nothing if there is no active combatant or if the sheet is not currently open.
 *
 * @param combat A Combat instance (usually provided by a hook)
 */
export function focusCombatantSheet(combat: Combat): void {
  const sheet = getCombatantSheet(combat)
  if (!sheet || !sheet.rendered) {
    // combatant does not have a sheet
    return
  }

  const popout = getPopout(sheet)
  if (popout !== null) {
    focus(popout)
  } else {
    sheet.bringToTop()
  }
}
