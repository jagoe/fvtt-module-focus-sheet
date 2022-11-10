import { Settings } from '../Settings'
import { getCombatantSheet } from '../Combat'
import { isPC } from '../Combatant'

export async function closeCurrentCombatantSheet(combat: Combat): Promise<void> {
  if (!combat.started || combat.combatant === undefined) {
    // no active combat turn; nothing to do
    return
  }

  const settings = Settings.GetInstance()

  if (!settings.AutoClose) {
    return
  }

  if (settings.IgnorePcSheets.Enabled && isPC(combat.combatant.actor, settings.IgnorePcSheets.ActorTypes)) {
    // PC sheets are ignored; nothing to do
    return
  }

  const sheet = getCombatantSheet(combat.combatant)
  if (!sheet) {
    // no sheet to close
    return
  }

  if (!sheet.rendered) {
    // sheet isn't being displayed, no need to close it
    return
  }

  await sheet.close()
}
